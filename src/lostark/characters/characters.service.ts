import { Injectable } from '@nestjs/common';
import { EngraveService } from '../../resources/engrave/engrave.service';
import { CreateSkillSettingDto } from '../../statistics/skill-settings/dto/create-skill-setting.dto';
import { SkillSettingsService } from '../../statistics/skill-settings/skill-settings.service';
import { SiblingDto } from './dto/sibling.dto';
import {
  CharacterCard,
  CharacterCollectible,
  CharacterEngrave,
  CharacterEquipment,
  CharacterGem,
  CharacterInfoDto,
  CharacterProfile,
  CharacterSkill,
} from './dto/characterInfo.dto';
import { SkillUsage } from 'src/statistics/skill-settings/schemas/skill-setting.schema';
import { ProfilesService } from 'src/statistics/profiles/profiles.service';
import { AbilitySettingsService } from 'src/statistics/ability-settings/ability-settings.service';
import { ElixirSettingsService } from 'src/statistics/elixir-settings/elixir-settings.service';
import { EngraveSettingsService } from 'src/statistics/engrave-settings/engrave-settings.service';
import { SetSettingsService } from 'src/statistics/set-settings/set-settings.service';

@Injectable()
export class CharactersService {
  constructor(
    private readonly profilesService: ProfilesService,
    private readonly abilitySettingsService: AbilitySettingsService,
    private readonly elixirSettingsService: ElixirSettingsService,
    private readonly engraveSettingsService: EngraveSettingsService,
    private readonly setSettingsService: SetSettingsService,
    private readonly skillSettingsService: SkillSettingsService,
    private readonly engraveService: EngraveService,
  ) {}

  async parseSiblings(
    siblings: {
      ServerName: string;
      CharacterName: string;
      CharacterLevel: number;
      CharacterClassName: string;
      ItemAvgLevel: string;
    }[],
  ) {
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
  }) {
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

    this.addToStatistic(result);

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
  ) {
    const characterProfile: CharacterProfile = {
      expeditionLevel: profile.ExpeditionLevel,
      title: profile.Title,
      guildName: profile.GuildName,
      usingSkillPoint: profile.UsingSkillPoint,
      totalSkillPoint: profile.TotalSkillPoint,
      stats: {},
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
  ) {
    const characterEquipments: { [equipment: string]: CharacterEquipment } = {};

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

            if (
              characterEquipment.type === '귀걸이' ||
              characterEquipment.type === '반지'
            ) {
              if (characterEquipments[characterEquipment.type] === undefined) {
                characterEquipments[characterEquipment.type] =
                  characterEquipment;
              } else {
                characterEquipments[`${characterEquipment.type}2`] =
                  characterEquipment;
              }
            } else {
              characterEquipments[characterEquipment.type] = characterEquipment;
            }
          }
        }),
      );
    } else {
      return null;
    }

    // 에스더 무기인 경우 장갑의 세트효과를 할당
    if (
      characterEquipments['무기']?.itemGrade === '에스더' &&
      characterEquipments['장갑']?.itemSet
    ) {
      characterEquipments['무기']['itemSet'] =
        characterEquipments['장갑']['itemSet'];
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
  ) {
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
  ) {
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
  ) {
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
  ) {
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
  ) {
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

      // 장착중인 직업각인 추출
      let classEngrave: string = '';
      let classEngraves = characterInfo.engraves
        .map((engrave) => {
          if (classEngraveNames.includes(engrave.engraveName))
            return engrave.engraveName;
        })
        .filter((element) => element);

      if (classEngraves.length === 1) classEngrave = classEngraves[0];
      else if (classEngraves.length === 2) classEngrave = '쌍직각';
      else return null;

      this.profilesService.upsertProfile({
        characterName: characterInfo.profile.characterName,
        className: characterInfo.profile.className,
        itemLevel: characterInfo.profile.itemLevel,
      });

      this.abilitySettingsService.upsertAbilitySetting({
        characterName: characterInfo.profile.characterName,
        className: characterInfo.profile.className,
        classEngrave: classEngrave,
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
          classEngrave: classEngrave,
          elixir: elixir,
        });
      }

      this.engraveSettingsService.upsertEngraveSetting({
        characterName: characterInfo.profile.characterName,
        className: characterInfo.profile.className,
        classEngrave: classEngrave,
        engraves: characterInfo.engraves,
      });

      const set = this.setSettingsService.parseSet(characterInfo.equipments);
      if (set) {
        this.setSettingsService.upsertSetSetting({
          characterName: characterInfo.profile.characterName,
          className: characterInfo.profile.className,
          classEngrave: classEngrave,
          set: set,
        });
      }

      this.skillSettingsService.upsertSkillSetting({
        characterName: characterInfo.profile.characterName,
        className: characterInfo.profile.className,
        classEngrave: classEngrave,
        skillUsages: this.skillSettingsService.parseSkillUsage(
          characterInfo.skills,
        ),
      });
    }
  }
}
