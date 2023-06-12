import { Injectable } from '@nestjs/common';
import { ChaosRewardsService } from './chaos-rewards/chaos-rewards.service';
import { GuardianRewardsService } from './guardian-rewards/guardian-rewards.service';
import { SkillSettingsService } from './skill-settings/skill-settings.service';
import { GuardianReward } from './guardian-rewards/schemas/guardian-reward.schema';
import { ChaosReward } from './chaos-rewards/schemas/chaos-reward.schema';
import { StatisticsChaos } from './dto/statistics-chaos.dto';
import { StatisticsGuardian } from './dto/statistics-guardian.dto';
import { CreateChaosRewardDto } from './chaos-rewards/dto/create-chaos-reward.dto';
import { CreateGuardianRewardDto } from './guardian-rewards/dto/create-guardian-reward.dto';
import { EngraveService } from '../resources/engrave/engrave.service';
import { StatisticsSkill } from './dto/statistics-skill.dto';
import { AbilitySettingsService } from './ability-settings/ability-settings.service';
import { ElixirSettingsService } from './elixir-settings/elixir-settings.service';
import { EngraveSettingsService } from './engrave-settings/engrave-settings.service';
import { ProfilesService } from './profiles/profiles.service';
import { SetSettingsService } from './set-settings/set-settings.service';
import { StatisticsAbility } from './dto/statistics-ability.dto';
import { StatisticsElixir } from './dto/statistics-elixir.dto';
import { StatisticsEngrave } from './dto/statistics-engrave.dto';
import { StatisticsSet } from './dto/statistics-set.dto';
import { StatisticsAbilityAll } from './dto/statistics-ability-all.dto';
import { StatisticsElixirAll } from './dto/statistics-elixir-all.dto';
import { StatisticsEngraveAll } from './dto/statistics-engrave-all.dto';
import { StatisticsSetAll } from './dto/statistics-set-all.dto';

@Injectable()
export class StatisticsService {
  constructor(
    private readonly chaosRewardsService: ChaosRewardsService,
    private readonly guardianRewardsService: GuardianRewardsService,
    private readonly skillSettingsService: SkillSettingsService,
    private readonly abilitySettingsService: AbilitySettingsService,
    private readonly elixirSettingsService: ElixirSettingsService,
    private readonly engraveSettingsService: EngraveSettingsService,
    private readonly profilesService: ProfilesService,
    private readonly setSettingsService: SetSettingsService,
    private readonly engraveService: EngraveService,
  ) {}

  async getStatisticsChaos(level: string) {
    const chaosRewards: ChaosReward[] =
      await this.chaosRewardsService.findChaosRewardsByLevel(level);
    const statisticsChaos: StatisticsChaos = {
      count: 0,
      level: level,
      itemCounts: {
        silling: 0,
        shard: 0,
        destructionStone: 0,
        protectionStone: 0,
        leapStone: 0,
        gem: 0,
      },
    };
    const items = Object.keys(statisticsChaos.itemCounts);

    // rewards 합산
    for (const chaosReward of chaosRewards) {
      statisticsChaos.count += chaosReward.count;

      for (const item of items) {
        statisticsChaos.itemCounts[item] += chaosReward[item];
      }
    }

    return statisticsChaos;
  }

  async createChaosReward(createChaosRewardDto: CreateChaosRewardDto) {
    return await this.chaosRewardsService.createChaosReward(
      createChaosRewardDto,
    );
  }

  async getStatisticsGuardian(level: string) {
    const guardianRewards: GuardianReward[] =
      await this.guardianRewardsService.findGuardianRewardsByLevel(level);
    const statisticsGuardian: StatisticsGuardian = {
      count: 0,
      level: level,
      itemCounts: {
        destructionStone: 0,
        protectionStone: 0,
        leapStone: 0,
      },
    };
    const items = Object.keys(statisticsGuardian.itemCounts);

    // rewards 합산
    for (const guardianReward of guardianRewards) {
      statisticsGuardian.count += guardianReward.count;

      for (const item of items) {
        statisticsGuardian.itemCounts[item] += guardianReward[item];
      }
    }

    return statisticsGuardian;
  }

  async createGuardianReward(createGuardianRewardDto: CreateGuardianRewardDto) {
    return await this.guardianRewardsService.createGuardianReward(
      createGuardianRewardDto,
    );
  }

  addCount(object: any, key: string) {
    if (object[key] === undefined) {
      object[key] = 0;
    }
    object[key]++;
  }

  async getStatisticsSkill(className: string) {
    // 직업 각인 목록 초기화
    const classEngraveNames = await this.engraveService.findClassEngraveNames(
      className,
    );

    if (classEngraveNames.length === 0) return null;

    // Statistics 초기화
    const statisticsSkill: StatisticsSkill = {
      count: 0,
    };

    for (const classEngraveName of classEngraveNames) {
      statisticsSkill[classEngraveName] = {
        count: 0,
      };
    }

    // 데이터 합산
    (await this.skillSettingsService.findSkillSettings(className)).forEach(
      (skillSetting) => {
        if (statisticsSkill[skillSetting.classEngrave] !== undefined) {
          statisticsSkill.count++;
          statisticsSkill[skillSetting.classEngrave]['count']++;

          skillSetting.skillUsages.forEach((skillUsage) => {
            // skillCount
            statisticsSkill[skillSetting.classEngrave][skillUsage.skillName] ===
            undefined
              ? (statisticsSkill[skillSetting.classEngrave][
                  skillUsage.skillName
                ] = {
                  count: 1,
                  levels: {},
                  tripods: {},
                  runes: {},
                })
              : statisticsSkill[skillSetting.classEngrave][
                  skillUsage.skillName
                ]['count']++;

            // skillLevel
            this.addCount(
              statisticsSkill[skillSetting.classEngrave][skillUsage.skillName][
                'levels'
              ],
              skillUsage.skillLevel.toString(),
            );

            // tripod
            skillUsage.tripodNames.forEach((tripodName) => {
              this.addCount(
                statisticsSkill[skillSetting.classEngrave][
                  skillUsage.skillName
                ]['tripods'],
                tripodName,
              );
            });

            // rune
            const runeName =
              skillUsage.runeName === '' ? '미착용' : skillUsage.runeName;
            this.addCount(
              statisticsSkill[skillSetting.classEngrave][skillUsage.skillName][
                'runes'
              ],
              runeName,
            );
          });
        }
      },
    );

    return statisticsSkill;
  }

  async getStatisticsAbilityAll() {
    const statisticsAbilityAll: StatisticsAbilityAll = {
      count: 0,
    };

    (await this.abilitySettingsService.findAbilitySettings(null)).forEach(
      (abilitySetting) => {
        statisticsAbilityAll.count++;

        if (abilitySetting.ability)
          this.addCount(statisticsAbilityAll, abilitySetting.ability);
      },
    );

    return statisticsAbilityAll;
  }

  async getStatisticsAbility(className: string) {
    // StatisticsAbility 초기화
    const statisticsAbility: StatisticsAbility = {
      count: 0,
    };

    (await this.engraveService.findClassEngraveNames(className)).forEach(
      (classEngraveName) => {
        statisticsAbility[classEngraveName] = {
          count: 0,
        };
      },
    );

    // 데이터 합산
    (await this.abilitySettingsService.findAbilitySettings(className)).forEach(
      (abilitySetting) => {
        statisticsAbility.count++;
        statisticsAbility[abilitySetting.classEngrave]['count']++;

        if (abilitySetting.ability)
          this.addCount(
            statisticsAbility[abilitySetting.classEngrave],
            abilitySetting.ability,
          );
      },
    );

    return statisticsAbility;
  }

  async getStatisticsElixirAll() {
    const statisticsElixirAll: StatisticsElixirAll = {
      count: 0,
    };

    (await this.elixirSettingsService.findElixirSettings(null)).forEach(
      (elixirSetting) => {
        statisticsElixirAll.count++;

        if (elixirSetting.elixir)
          this.addCount(statisticsElixirAll, elixirSetting.elixir);
      },
    );

    return statisticsElixirAll;
  }

  async getStatisticsElixir(className: string) {
    // StatisticsElixir 초기화
    const statisticsElixir: StatisticsElixir = {
      count: 0,
    };

    (await this.engraveService.findClassEngraveNames(className)).forEach(
      (classEngraveName) => {
        statisticsElixir[classEngraveName] = {
          count: 0,
        };
      },
    );

    // 데이터 합산
    (await this.elixirSettingsService.findElixirSettings(className)).forEach(
      (elixirSetting) => {
        statisticsElixir.count++;
        statisticsElixir[elixirSetting.classEngrave]['count']++;

        if (elixirSetting.elixir)
          this.addCount(
            statisticsElixir[elixirSetting.classEngrave],
            elixirSetting.elixir,
          );
      },
    );

    return statisticsElixir;
  }

  async getStatisticEngraveAll() {
    const statisticsEngraveAll: StatisticsEngraveAll[] = Array.from(
      { length: 3 },
      () => {
        return { count: 0 };
      },
    );

    (await this.engraveSettingsService.findEngraveSettings(null)).forEach(
      (engraveSetting) => {
        statisticsEngraveAll.forEach((v) => {
          v.count++;
        });

        engraveSetting.engraves.forEach((engrave) => {
          this.addCount(
            statisticsEngraveAll[engrave.engraveLevel - 1],
            engrave.engraveName,
          );
        });
      },
    );

    return statisticsEngraveAll;
  }

  async getStatisticEngrave(className: string) {
    // StatisticsEngrave 초기화
    const statisticsEngraves: StatisticsEngrave[] = Array.from(
      { length: 3 },
      () => {
        return { count: 0 };
      },
    );

    (await this.engraveService.findClassEngraveNames(className)).forEach(
      (classEngraveName) => {
        statisticsEngraves.forEach((statisticsEngrave) => {
          statisticsEngrave[classEngraveName] = {
            count: 0,
          };
        });
      },
    );

    // 데이터 합산
    (await this.engraveSettingsService.findEngraveSettings(className)).forEach(
      (engraveSetting) => {
        statisticsEngraves.forEach((statisticsEngrave) => {
          statisticsEngrave.count++;
          statisticsEngrave[engraveSetting.classEngrave]['count']++;
        });

        engraveSetting.engraves.forEach((engrave) => {
          this.addCount(
            statisticsEngraves[engrave.engraveLevel - 1][
              engraveSetting.classEngrave
            ],
            engrave.engraveName,
          );
        });
      },
    );

    return statisticsEngraves;
  }

  async getStatisticsSetAll() {
    const statisticsSetAll: StatisticsSetAll = {
      count: 0,
    };

    (await this.setSettingsService.findSetSettings(null)).forEach(
      (setSetting) => {
        statisticsSetAll.count++;

        if (setSetting.set) this.addCount(statisticsSetAll, setSetting.set);
      },
    );

    return statisticsSetAll;
  }

  async getStatisticsSet(className: string) {
    // StatisticsSet 초기화
    const statisticsSet: StatisticsSet = {
      count: 0,
    };

    (await this.engraveService.findClassEngraveNames(className)).forEach(
      (classEngraveName) => {
        statisticsSet[classEngraveName] = {
          count: 0,
        };
      },
    );

    // 데이터 합산
    (await this.setSettingsService.findSetSettings(className)).forEach(
      (setSetting) => {
        statisticsSet.count++;
        statisticsSet[setSetting.classEngrave]['count']++;

        if (setSetting.set)
          this.addCount(statisticsSet[setSetting.classEngrave], setSetting.set);
      },
    );

    return statisticsSet;
  }
}
