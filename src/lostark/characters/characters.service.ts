import { Injectable } from '@nestjs/common';
import { EngraveService } from '../../resources/engrave/engrave.service';
import { SkillSettingsService } from '../../statistics/skill-settings/skill-settings.service';
import { SiblingDto } from './dto/sibling.dto';
import { CharacterInfoDto } from './dto/characterInfo.dto';
import { ProfilesService } from '../../statistics/profiles/profiles.service';
import { AbilitySettingsService } from '../../statistics/ability-settings/ability-settings.service';
import { ElixirSettingsService } from '../../statistics/elixir-settings/elixir-settings.service';
import { EngraveSettingsService } from '../../statistics/engrave-settings/engrave-settings.service';
import { SetSettingsService } from '../../statistics/set-settings/set-settings.service';
import { CharacterProfile } from './interfaces/character-profile.interface';
import { CharacterEquipment } from './interfaces/character-equipment.interface';
import { CharacterSkill } from './interfaces/character-skill.interface';
import { CharacterGem } from './interfaces/character-gem.interface';
import { CharacterEngrave } from './interfaces/character-engrave.interface';
import { CharacterCard } from './interfaces/character-card.interface';
import { CharacterCollectible } from './interfaces/character-collectible.interface';
import { ApiRequestService } from '../api-request/api-request.service';

@Injectable()
export class CharactersService {
  constructor(
    private readonly apiRequestService: ApiRequestService,
    private readonly profilesService: ProfilesService,
    private readonly abilitySettingsService: AbilitySettingsService,
    private readonly elixirSettingsService: ElixirSettingsService,
    private readonly engraveSettingsService: EngraveSettingsService,
    private readonly setSettingsService: SetSettingsService,
    private readonly skillSettingsService: SkillSettingsService,
    private readonly engraveService: EngraveService,
  ) {}

  async getCharacterInfo(characterName: string): Promise<CharacterInfoDto> {
    const result = await this.apiRequestService.get(
      `https://developer-lostark.game.onstove.com/armories/characters/${characterName}?filters=profiles%2Bequipment%2Bcombat-skills%2Bengravings%2Bcards%2Bgems%2Bcollectibles`,
    );

    if (result.data === null) {
      return null;
    } else {
      return await this.parseCharacter(result.data);
    }
  }

  async getSiblings(characterName: string): Promise<SiblingDto[]> {
    const result = await this.apiRequestService.get(
      `https://developer-lostark.game.onstove.com/characters/${characterName}/siblings`,
    );

    if (result.data === null) {
      return null;
    } else {
      return await this.parseSiblings(result.data);
    }
  }

  async parseSiblings(
    siblings: {
      ServerName: string;
      CharacterName: string;
      CharacterLevel: number;
      CharacterClassName: string;
      ItemAvgLevel: string;
    }[],
  ): Promise<SiblingDto[]> {
    const result: SiblingDto[] = [];

    await Promise.all(
      siblings.map((sibling) => {
        result.push({
          serverName: sibling.ServerName,
          characterName: sibling.CharacterName,
          characterLevel: sibling.CharacterLevel,
          className: sibling.CharacterClassName,
          itemLevel: Number.parseFloat(sibling.ItemAvgLevel.replace(',', '')),
        });
      }),
    );

    return result;
  }

  async parseCharacter(character: {
    ArmoryProfile: {};
    ArmoryEquipment: [];
    ArmorySkills: [];
    ArmoryEngraving: {};
    ArmoryCard: {};
    ArmoryGem: {};
    Collectibles: [];
  }): Promise<CharacterInfoDto> {
    const parseKeys = Object.keys(character);
    const parsers = [
      this.parseProfile,
      this.parseEquipments,
      this.parseSkills,
      this.parseEngraves,
      this.parseCards,
      this.parseGems,
      this.parseCollectibles,
    ];

    const result: CharacterInfoDto = {
      profile: null,
      equipments: null,
      skills: null,
      engraves: null,
      cards: null,
      gems: null,
      collectibles: null,
    };
    const resultKeys = Object.keys(result);

    await Promise.all(
      parseKeys.map(async (parseKey, i) => {
        result[resultKeys[i]] = await parsers[i](this, character[parseKey]);
      }),
    );

    let isValid = true;

    for (const key in result) {
      if (!result[key]) {
        isValid = false;
        break;
      }
    }

    if (isValid) this.addToStatistic(result);

    return result;
  }

  async parseProfile(
    _,
    profile: {
      ExpeditionLevel: number;
      Title: string;
      GuildName: string;
      UsingSkillPoint: number;
      TotalSkillPoint: number;
      Stats: {
        Type: string;
        Value: number;
      }[];
      ServerName: string;
      CharacterName: string;
      CharacterLevel: number;
      CharacterClassName: string;
      ItemAvgLevel: string;
    },
  ): Promise<CharacterProfile> {
    const characterProfile: CharacterProfile = {
      expeditionLevel: profile.ExpeditionLevel,
      title: profile.Title,
      guildName: profile.GuildName,
      usingSkillPoint: profile.UsingSkillPoint,
      totalSkillPoint: profile.TotalSkillPoint,
      stats: {
        치명: 0,
        특화: 0,
        제압: 0,
        신속: 0,
        인내: 0,
        숙련: 0,
        '최대 생명력': 0,
        공격력: 0,
      },
      serverName: profile.ServerName,
      characterName: profile.CharacterName,
      characterLevel: profile.CharacterLevel,
      className: profile.CharacterClassName,
      itemLevel: Number.parseFloat(profile.ItemAvgLevel.replace(',', '')),
    };

    if (profile.Stats) {
      await Promise.all(
        profile.Stats.map((stat) => {
          characterProfile.stats[stat.Type] = Number(stat.Value);
        }),
      );
    } else {
      characterProfile.stats = null;
    }

    return characterProfile;
  }

  async parseEquipments(
    parent: CharactersService,
    equipments: {
      Type: string;
      Name: string;
      Icon: string;
      Grade: string;
      Tooltip: string;
    }[],
  ): Promise<CharacterEquipment[]> {
    const characterEquipments: CharacterEquipment[] = [];
    let weapon = {};
    let hand = {};

    if (equipments) {
      await Promise.all(
        equipments.map(async (equipment) => {
          if (
            equipment.Type !== '나침반' &&
            equipment.Type !== '부적' &&
            equipment.Type !== '문장'
          ) {
            const characterEquipment: CharacterEquipment = {
              type: equipment.Type,
              name: equipment.Name,
              iconPath: equipment.Icon,
              itemGrade: equipment.Grade,
            };

            await parent.parseEquipmentTooltip(
              JSON.parse(equipment.Tooltip),
              characterEquipment,
            );

            characterEquipments.push(characterEquipment);

            if (characterEquipment.type === '무기') weapon = characterEquipment;
            else if (characterEquipment.type === '장갑')
              hand = characterEquipment;
          }
        }),
      );
    } else {
      return null;
    }

    // 에스더 무기인 경우 장갑의 세트효과를 할당
    if (
      (weapon as CharacterEquipment).itemGrade === '에스더' &&
      (hand as CharacterEquipment).itemSet
    ) {
      (weapon as CharacterEquipment).itemSet = (
        hand as CharacterEquipment
      ).itemSet;
    }

    return characterEquipments;
  }

  async parseSkills(
    _,
    skills: {
      Name: string;
      Icon: string;
      Level: number;
      Tripods: {
        Name: string;
        Level: number;
        IsSelected: boolean;
      }[];
      Rune: {
        Name: string;
        Icon: string;
        Grade: string;
      };
    }[],
  ): Promise<CharacterSkill[]> {
    const characterSkills: CharacterSkill[] = [];

    if (skills) {
      await Promise.all(
        skills.map((skill) => {
          if (skill.Level > 1 || skill.Rune) {
            const characterSkill: CharacterSkill = {
              skillName: skill.Name,
              skillLevel: skill.Level,
              tripods: [],
              rune: null,
            };

            skill.Tripods.forEach((tripod) => {
              if (tripod.IsSelected) {
                characterSkill.tripods.push({
                  tripodName: tripod.Name,
                  tripodLevel: tripod.Level,
                });
              }
            });

            if (skill.Rune) {
              characterSkill.rune = {
                runeName: skill.Rune.Name,
                itemGrade: skill.Rune.Grade,
                iconPath: skill.Rune.Icon,
              };
            }

            characterSkills.push(characterSkill);
          }
        }),
      );
    } else {
      return null;
    }

    return characterSkills;
  }

  async parseEngraves(
    _,
    engraves: {
      Effects: {
        Name: string;
      }[];
    },
  ): Promise<CharacterEngrave[]> {
    const characterEngraves: CharacterEngrave[] = [];

    if (engraves) {
      await Promise.all(
        engraves.Effects.map((engrave) => {
          const engraveStr = engrave.Name;

          characterEngraves.push({
            engraveName: engraveStr.substring(0, engraveStr.indexOf('Lv.') - 1),
            engraveLevel: Number(engraveStr[engraveStr.length - 1]),
          });
        }),
      );
    } else {
      return null;
    }

    return characterEngraves;
  }

  async parseCards(
    _,
    cards: {
      Effects: {
        Items: {
          Name: string;
        }[];
      }[];
    },
  ): Promise<CharacterCard[]> {
    const characterCards: CharacterCard[] = [];

    if (cards?.Effects) {
      await Promise.all(
        cards.Effects.map((card) => {
          if (card.Items.length !== 0) {
            const cardStr = card.Items[card.Items.length - 1].Name;

            if (cardStr.endsWith(')')) {
              characterCards.push({
                cardSet: cardStr.substring(0, cardStr.indexOf('(') - 1),
                awaken: Number(
                  cardStr.substring(
                    cardStr.indexOf('(') + 1,
                    cardStr.indexOf('각성'),
                  ),
                ),
              });
            } else {
              characterCards.push({
                cardSet: cardStr,
                awaken: 0,
              });
            }
          }
        }),
      );
    } else {
      return null;
    }

    return characterCards;
  }

  async parseGems(
    _,
    gems: {
      Gems: {
        Slot: number;
        Name: string;
        Icon: string;
        Level: number;
        Grade: string;
      }[];
      Effects: {
        GemSlot: number;
        Name: string;
      }[];
    },
  ): Promise<CharacterGem[]> {
    const characterGems: CharacterGem[] = [];

    if (gems) {
      const skillNames = Array(gems.Effects.length);

      await Promise.all(
        gems.Effects.map((effect) => {
          skillNames[effect.GemSlot] = effect.Name;
        }),
      );

      await Promise.all(
        gems.Gems.map((gem) => {
          characterGems.push({
            type: gem.Name.substring(
              gem.Name.indexOf('레벨') + String('레벨').length + 1,
              gem.Name.indexOf('의 보석'),
            ),
            gemLevel: gem.Level,
            iconPath: gem.Icon,
            itemGrade: gem.Grade,
            skillName: skillNames[gem.Slot],
          });
        }),
      );
    } else {
      return null;
    }

    return characterGems;
  }

  async parseCollectibles(
    _,
    collectibles: {
      Type: string;
      Point: number;
      MaxPoint: number;
    }[],
  ): Promise<CharacterCollectible[]> {
    const characterCollectibles: CharacterCollectible[] = [];

    if (collectibles) {
      await Promise.all(
        collectibles.map((collectible) => {
          characterCollectibles.push({
            type: collectible.Type,
            point: collectible.Point,
            maxPoint: collectible.MaxPoint,
          });
        }),
      );
    } else {
      return null;
    }

    return characterCollectibles;
  }

  async parseEquipmentTooltip(tooltip, characterEquipment: CharacterEquipment) {
    const elements = Object.keys(tooltip);

    await Promise.all(
      elements.map((element) => {
        const type = tooltip[element]['type'];
        const value = tooltip[element]['value'];

        if (type === 'SingleTextBox') {
          this.parseTooltipSingleTextBox(value, characterEquipment);
        } else if (type === 'ItemTitle') {
          this.parseTooltipItemTitle(value, characterEquipment);
        } else if (type === 'ItemPartBox') {
          this.parseTooltipItemPartBox(value, characterEquipment);
        } else if (type === 'IndentStringGroup') {
          this.parseTooltipIndentStringGroup(value, characterEquipment);
        }
      }),
    );
  }

  parseTooltipSingleTextBox(
    singleTextBox,
    characterEquipment: CharacterEquipment,
  ) {
    // ella
    if (singleTextBox.includes('엘라 부여 완료')) {
      characterEquipment.isElla = true;
    }
  }

  parseTooltipItemTitle(itemTitle, characterEquipment: CharacterEquipment) {
    // quality
    if (itemTitle.qualityValue && itemTitle.qualityValue != -1) {
      characterEquipment.quality = itemTitle.qualityValue;
    }

    // itemLevel
    if (itemTitle?.leftStr2?.includes('아이템 레벨 ')) {
      const start =
        itemTitle.leftStr2.indexOf('아이템 레벨 ') +
        String('아이템 레벨 ').length;
      const end = itemTitle.leftStr2.indexOf(' ', start);

      characterEquipment.itemLevel = Number(
        itemTitle.leftStr2.substring(start, end),
      );
    }
  }

  parseTooltipItemPartBox(itemPartBox, characterEquipment: CharacterEquipment) {
    // itemSet
    if (itemPartBox?.Element_000?.includes('세트 효과 레벨')) {
      const setName = itemPartBox.Element_001.substring(0, 2);
      const levelStart =
        itemPartBox.Element_001.indexOf('Lv.') + String('Lv.').length;
      const levelEnd = itemPartBox.Element_001.indexOf('</FONT>');
      const setLevel = Number(
        itemPartBox.Element_001.substring(levelStart, levelEnd),
      );

      characterEquipment.itemSet = {
        setName: setName,
        setLevel: setLevel,
      };
    }

    // ability
    if (
      characterEquipment.type === '목걸이' ||
      characterEquipment.type === '귀걸이' ||
      characterEquipment.type === '반지'
    ) {
      if (itemPartBox?.Element_000?.includes('추가 효과')) {
        characterEquipment.abilities = {};

        // 문자열 재구성
        const text =
          ' ' +
          itemPartBox.Element_001.replace('<BR>', '  ').replaceAll('+', '') +
          ' ';
        let index = 0;

        while (index < text.length) {
          const abilityName = text.substring(
            index + 1,
            (index = text.indexOf(' ', index + 1)),
          );
          const abilityValue = text.substring(
            index + 1,
            (index = text.indexOf(' ', index + 1)),
          );

          characterEquipment.abilities[abilityName] = Number(abilityValue);
          index++;
        }
      }
    }

    // bracelet effect
    if (itemPartBox?.Element_000?.includes('팔찌 효과')) {
      characterEquipment.braceletEffects = [];

      // 문자열 재구성
      const text = itemPartBox.Element_001.toLowerCase() + '<br>';
      let index = text.indexOf('</img>');

      while (index !== -1) {
        index += String('</img>').length;

        if (text[index] === ' ') {
          index++;
        }

        if (text[index] === '[') {
          const effect = text
            .substring(index, text.indexOf(']', index) + 1)
            .replace(/(<([^>]+)>)/gi, '');
          characterEquipment.braceletEffects.push(effect);
        } else {
          const effect = text.substring(index, text.indexOf('<br>', index));
          characterEquipment.braceletEffects.push(effect);
        }

        index = text.indexOf('</img>', index);
      }
    }
  }

  parseTooltipIndentStringGroup(
    indentStringGroup,
    characterEquipment: CharacterEquipment,
  ) {
    // elixir
    if (indentStringGroup?.Element_000?.topStr?.includes('엘릭서 효과')) {
      characterEquipment.elixirs = {};

      const elixirEffect = indentStringGroup.Element_000.contentStr;

      for (const element in elixirEffect) {
        if (elixirEffect[element].bPoint) {
          const elixirStr = elixirEffect[element].contentStr;

          let index =
            elixirStr.indexOf('</FONT>') + String('</FONT>').length + 1;
          const elixirName = elixirStr.substring(
            index,
            elixirStr.indexOf('<FONT', index) - 1,
          );

          index = elixirStr.indexOf('Lv.') + String('Lv.').length;
          const elixirLevel = elixirStr.substring(
            index,
            elixirStr.indexOf('</FONT>', index),
          );

          characterEquipment.elixirs[elixirName] = Number(elixirLevel);
        }
      }
    }

    // engrave
    if (indentStringGroup?.Element_000?.topStr?.includes('각인 효과')) {
      characterEquipment.engraves = {};

      const engraveEffect = indentStringGroup.Element_000.contentStr;

      for (const element in engraveEffect) {
        const engraveStr = engraveEffect[element].contentStr;

        let index = String('[<FONT COLOR="#######">').length;
        const engraveName = engraveStr.substring(
          index,
          engraveStr.indexOf('</FONT>'),
        );

        index = engraveStr.indexOf('+') + 1;
        const engraveValue = engraveStr.substring(
          index,
          engraveStr.indexOf('<BR>'),
        );

        characterEquipment.engraves[engraveName] = Number(engraveValue);
      }
    }
  }

  async addToStatistic(characterInfo: CharacterInfoDto) {
    if (characterInfo.profile.itemLevel >= 1560) {
      const classEngraveNames = await this.engraveService.findClassEngraveNames(
        characterInfo.profile.className,
      );

      // 메인 직업각인 추출
      let mainClassEngrave: string = '';
      let classEngraves = characterInfo.engraves
        .map((engrave) => {
          if (classEngraveNames.includes(engrave.engraveName)) {
            return engrave;
          }
        })
        .filter((element) => element);

      if (classEngraves.length === 1) {
        mainClassEngrave = classEngraves[0].engraveName;
      } else if (classEngraves.length === 2) {
        mainClassEngrave =
          classEngraves[0].engraveLevel === 3
            ? classEngraves[0].engraveName
            : classEngraves[1].engraveName;
      }

      if (mainClassEngrave === '') return null;

      // statistic 데이터로 추가
      this.profilesService.upsertProfile({
        characterName: characterInfo.profile.characterName,
        className: characterInfo.profile.className,
        itemLevel: characterInfo.profile.itemLevel,
      });

      this.abilitySettingsService.upsertAbilitySetting({
        characterName: characterInfo.profile.characterName,
        className: characterInfo.profile.className,
        classEngrave: mainClassEngrave,
        ability: this.abilitySettingsService.parseMainAbilities(
          characterInfo.profile.stats,
        ),
      });

      const elixir = this.elixirSettingsService.parseElixir(
        characterInfo.equipments,
      );
      if (elixir) {
        this.elixirSettingsService.upsertElixirSetting({
          characterName: characterInfo.profile.characterName,
          className: characterInfo.profile.className,
          classEngrave: mainClassEngrave,
          elixir: elixir,
        });
      }

      this.engraveSettingsService.upsertEngraveSetting({
        characterName: characterInfo.profile.characterName,
        className: characterInfo.profile.className,
        classEngrave: mainClassEngrave,
        engraves: characterInfo.engraves,
      });

      const set = this.setSettingsService.parseSet(characterInfo.equipments);
      if (set) {
        this.setSettingsService.upsertSetSetting({
          characterName: characterInfo.profile.characterName,
          className: characterInfo.profile.className,
          classEngrave: mainClassEngrave,
          set: set,
        });
      }

      this.skillSettingsService.upsertSkillSetting({
        characterName: characterInfo.profile.characterName,
        className: characterInfo.profile.className,
        classEngrave: mainClassEngrave,
        skillUsages: this.skillSettingsService.parseSkillUsage(
          characterInfo.skills,
        ),
      });
    }
  }
}
