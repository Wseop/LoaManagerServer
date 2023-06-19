import { Injectable } from '@nestjs/common';
import { ChaosRewardsService } from './chaos-rewards/chaos-rewards.service';
import { GuardianRewardsService } from './guardian-rewards/guardian-rewards.service';
import { SkillSettingsService } from './skill-settings/skill-settings.service';
import { GuardianReward } from './guardian-rewards/schemas/guardian-reward.schema';
import { ChaosReward } from './chaos-rewards/schemas/chaos-reward.schema';
import { StatisticsChaosDto } from './dto/statistics-chaos.dto';
import { StatisticsGuardianDto } from './dto/statistics-guardian.dto';
import { CreateChaosRewardDto } from './chaos-rewards/dto/create-chaos-reward.dto';
import { CreateGuardianRewardDto } from './guardian-rewards/dto/create-guardian-reward.dto';
import { EngraveService } from '../resources/engrave/engrave.service';
import { StatisticsSkillDto } from './dto/statistics-skill.dto';
import { AbilitySettingsService } from './ability-settings/ability-settings.service';
import { ElixirSettingsService } from './elixir-settings/elixir-settings.service';
import { EngraveSettingsService } from './engrave-settings/engrave-settings.service';
import { ProfilesService } from './profiles/profiles.service';
import { SetSettingsService } from './set-settings/set-settings.service';
import { StatisticsCountDto } from './dto/statistics-count.dto';

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

  async getStatisticsChaos(level: string): Promise<StatisticsChaosDto> {
    const chaosRewards: ChaosReward[] =
      await this.chaosRewardsService.findChaosRewardsByLevel(level);
    const statisticsChaos: StatisticsChaosDto = {
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

  async createChaosReward(
    createChaosRewardDto: CreateChaosRewardDto,
  ): Promise<ChaosReward> {
    return await this.chaosRewardsService.createChaosReward(
      createChaosRewardDto,
    );
  }

  async getStatisticsGuardian(level: string): Promise<StatisticsGuardianDto> {
    const guardianRewards: GuardianReward[] =
      await this.guardianRewardsService.findGuardianRewardsByLevel(level);
    const statisticsGuardian: StatisticsGuardianDto = {
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

  async createGuardianReward(
    createGuardianRewardDto: CreateGuardianRewardDto,
  ): Promise<GuardianReward> {
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

  async getStatisticsSkill(className: string): Promise<StatisticsSkillDto> {
    // 직업 각인 목록 초기화
    const classEngraveNames = await this.engraveService.findClassEngraveNames(
      className,
    );

    if (classEngraveNames.length === 0) return null;

    // Statistics 초기화
    const statisticsSkill: StatisticsSkillDto = {
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

  async getStatisticsAbility(className: string): Promise<StatisticsCountDto> {
    // StatisticsAbility 초기화
    const statisticsAbility: StatisticsCountDto = {
      count: 0,
    };

    if (className) {
      (await this.engraveService.findClassEngraveNames(className)).forEach(
        (classEngraveName) => {
          statisticsAbility[classEngraveName] = {
            count: 0,
          };
        },
      );
    }

    // 데이터 합산
    (await this.abilitySettingsService.findAbilitySettings(className)).forEach(
      (abilitySetting) => {
        statisticsAbility.count++;

        if (className)
          statisticsAbility[abilitySetting.classEngrave]['count']++;

        if (abilitySetting.ability) {
          if (className) {
            this.addCount(
              statisticsAbility[abilitySetting.classEngrave],
              abilitySetting.ability,
            );
          } else {
            this.addCount(statisticsAbility, abilitySetting.ability);
          }
        }
      },
    );

    return statisticsAbility;
  }

  async getStatisticsElixir(className: string): Promise<StatisticsCountDto> {
    // StatisticsElixir 초기화
    const statisticsElixir: StatisticsCountDto = {
      count: 0,
    };

    if (className) {
      (await this.engraveService.findClassEngraveNames(className)).forEach(
        (classEngraveName) => {
          statisticsElixir[classEngraveName] = {
            count: 0,
          };
        },
      );
    }

    // 데이터 합산
    (await this.elixirSettingsService.findElixirSettings(className)).forEach(
      (elixirSetting) => {
        statisticsElixir.count++;

        if (className) statisticsElixir[elixirSetting.classEngrave]['count']++;

        if (elixirSetting.elixir) {
          if (className) {
            this.addCount(
              statisticsElixir[elixirSetting.classEngrave],
              elixirSetting.elixir,
            );
          } else {
            this.addCount(statisticsElixir, elixirSetting.elixir);
          }
        }
      },
    );

    return statisticsElixir;
  }

  async getStatisticsEngrave(className: string): Promise<StatisticsCountDto[]> {
    // StatisticsEngrave 초기화
    const statisticsEngraves: StatisticsCountDto[] = Array.from(
      { length: 3 },
      () => {
        return { count: 0 };
      },
    );

    if (className) {
      (await this.engraveService.findClassEngraveNames(className)).forEach(
        (classEngraveName) => {
          statisticsEngraves.forEach((statisticsEngrave) => {
            statisticsEngrave[classEngraveName] = {
              count: 0,
            };
          });
        },
      );
    }

    // 데이터 합산
    (await this.engraveSettingsService.findEngraveSettings(className)).forEach(
      (engraveSetting) => {
        statisticsEngraves.forEach((statisticsEngrave) => {
          statisticsEngrave.count++;

          if (className)
            statisticsEngrave[engraveSetting.classEngrave]['count']++;
        });

        engraveSetting.engraves.forEach((engrave) => {
          if (className) {
            this.addCount(
              statisticsEngraves[engrave.engraveLevel - 1][
                engraveSetting.classEngrave
              ],
              engrave.engraveName,
            );
          } else {
            this.addCount(
              statisticsEngraves[engrave.engraveLevel - 1],
              engrave.engraveName,
            );
          }
        });
      },
    );

    return statisticsEngraves;
  }

  async getStatisticsSet(className: string): Promise<StatisticsCountDto> {
    // StatisticsSet 초기화
    const statisticsSet: StatisticsCountDto = {
      count: 0,
    };

    if (className) {
      (await this.engraveService.findClassEngraveNames(className)).forEach(
        (classEngraveName) => {
          statisticsSet[classEngraveName] = {
            count: 0,
          };
        },
      );
    }

    // 데이터 합산
    (await this.setSettingsService.findSetSettings(className)).forEach(
      (setSetting) => {
        statisticsSet.count++;

        if (className) statisticsSet[setSetting.classEngrave]['count']++;

        if (setSetting.set) {
          if (className)
            this.addCount(
              statisticsSet[setSetting.classEngrave],
              setSetting.set,
            );
          else this.addCount(statisticsSet, setSetting.set);
        }
      },
    );

    return statisticsSet;
  }
}
