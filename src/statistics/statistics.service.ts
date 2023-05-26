import { Injectable } from '@nestjs/common';
import { ChaosRewardsService } from './chaos-rewards/chaos-rewards.service';
import { GuardianRewardsService } from './guardian-rewards/guardian-rewards.service';
import { ArmorySettingsService } from './armory-settings/armory-settings.service';
import { SkillSettingsService } from './skill-settings/skill-settings.service';
import { GuardianReward } from './guardian-rewards/schemas/guardian-reward.schema';
import { ChaosReward } from './chaos-rewards/schemas/chaos-reward.schema';
import { StatsChaosReward } from './interfaces/stats-chaos-reward.interface';
import { StatsGuardianReward } from './interfaces/stats-guardian-reward.interface';
import { CreateChaosRewardDto } from './chaos-rewards/dto/create-chaos-reward.dto';
import { CreateGuardianRewardDto } from './guardian-rewards/dto/create-guardian-reward.dto';
import { StatsArmorySetting } from './interfaces/stats-armory-setting.interface';
import { EngraveService } from '../resources/engrave/engrave.service';
import { StatsSkillSetting } from './interfaces/stats-skill-setting.interface';

@Injectable()
export class StatisticsService {
  constructor(
    private readonly chaosRewardsService: ChaosRewardsService,
    private readonly guardianRewardsService: GuardianRewardsService,
    private readonly armorySettingsService: ArmorySettingsService,
    private readonly skillSettingsService: SkillSettingsService,

    private readonly engraveService: EngraveService,
  ) {}

  async getStatsChaosReward(level: string) {
    const chaosRewards: ChaosReward[] =
      await this.chaosRewardsService.findChaosRewardsByLevel(level);
    const statsChaosReward: StatsChaosReward = {
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
    const items = Object.keys(statsChaosReward.itemCounts);

    // rewards 합산
    for (const chaosReward of chaosRewards) {
      statsChaosReward.count += chaosReward.count;

      for (const item of items) {
        statsChaosReward.itemCounts[item] += chaosReward[item];
      }
    }

    return statsChaosReward;
  }

  async createChaosReward(createChaosRewardDto: CreateChaosRewardDto) {
    return await this.chaosRewardsService.createChaosReward(
      createChaosRewardDto,
    );
  }

  async getStatsGuardianReward(level: string) {
    const guardianRewards: GuardianReward[] =
      await this.guardianRewardsService.findGuardianRewardsByLevel(level);
    const statsGuardianReward: StatsGuardianReward = {
      count: 0,
      level: level,
      itemCounts: {
        destructionStone: 0,
        protectionStone: 0,
        leapStone: 0,
      },
    };
    const items = Object.keys(statsGuardianReward.itemCounts);

    // rewards 합산
    for (const guardianReward of guardianRewards) {
      statsGuardianReward.count += guardianReward.count;

      for (const item of items) {
        statsGuardianReward.itemCounts[item] += guardianReward[item];
      }
    }

    return statsGuardianReward;
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

  async getStatsArmorySetting(className: string) {
    // 직업 각인 목록 초기화
    const classEngraveNames = await this.engraveService.findClassEngraveNames(
      className,
    );
    if (classEngraveNames.length === 0) return null;
    else classEngraveNames.push('pair');

    // StatsArmorySetting 초기화
    const statsArmorySetting: StatsArmorySetting = {
      count: 0,
    };
    for (const classEngraveName of classEngraveNames) {
      statsArmorySetting[classEngraveName] = {
        count: 0,
        abilities: {},
        engraves: [{}, {}, {}],
        itemSets: {},
        elixirs: {},
      };
    }

    // armorySetting 데이터 합산
    (
      await this.armorySettingsService.findArmorySettingsByClassName(className)
    ).forEach((armorySetting) => {
      const classEngraveName =
        armorySetting.classEngraves.length === 1
          ? armorySetting.classEngraves[0].engraveName
          : 'pair';

      if (statsArmorySetting[classEngraveName] !== undefined) {
        // count
        statsArmorySetting.count++;
        statsArmorySetting[classEngraveName]['count']++;

        // ability
        this.addCount(
          statsArmorySetting[classEngraveName]['abilities'],
          armorySetting.ability,
        );

        // engrave (non-class)
        armorySetting.engraves.forEach((engrave) => {
          this.addCount(
            statsArmorySetting[classEngraveName]['engraves'][
              engrave.engraveLevel - 1
            ],
            engrave.engraveName,
          );
        });

        // engrave (class)
        armorySetting.classEngraves.forEach((classEngrave) => {
          this.addCount(
            statsArmorySetting[classEngraveName]['engraves'][
              classEngrave.engraveLevel - 1
            ],
            classEngrave.engraveName,
          );
        });

        // itemSet
        this.addCount(
          statsArmorySetting[classEngraveName]['itemSets'],
          armorySetting.itemSet,
        );

        // elixir
        this.addCount(
          statsArmorySetting[classEngraveName]['elixirs'],
          armorySetting.elixir,
        );
      }
    });

    return statsArmorySetting;
  }

  async getStatsSkillSetting(className: string) {
    // 직업 각인 목록 초기화
    const classEngraveNames = await this.engraveService.findClassEngraveNames(
      className,
    );
    if (classEngraveNames.length === 0) return null;
    else classEngraveNames.push('pair');

    // StatsSkillSetting 초기화
    const statsSkillSetting: StatsSkillSetting = {
      count: 0,
    };
    for (const classEngraveName of classEngraveNames) {
      statsSkillSetting[classEngraveName] = {
        count: 0,
      };
    }

    // skillSetting 데이터 합산
    (
      await this.skillSettingsService.findSkillSettingsByClassName(className)
    ).forEach((skillSetting) => {
      const classEngraveName =
        skillSetting.classEngraves.length === 1
          ? skillSetting.classEngraves[0]
          : 'pair';

      if (statsSkillSetting[classEngraveName] !== undefined) {
        statsSkillSetting.count++;
        statsSkillSetting[classEngraveName]['count']++;

        skillSetting.skillUsages.forEach((skillUsage) => {
          // skillCount
          statsSkillSetting[classEngraveName][skillUsage.skillName] ===
          undefined
            ? (statsSkillSetting[classEngraveName][skillUsage.skillName] = {
                count: 1,
                levels: {},
                tripods: {},
                runes: {},
              })
            : statsSkillSetting[classEngraveName][skillUsage.skillName][
                'count'
              ]++;

          // skillLevel
          this.addCount(
            statsSkillSetting[classEngraveName][skillUsage.skillName]['levels'],
            skillUsage.skillLevel.toString(),
          );

          // tripod
          skillUsage.tripodNames.forEach((tripodName) => {
            this.addCount(
              statsSkillSetting[classEngraveName][skillUsage.skillName][
                'tripods'
              ],
              tripodName,
            );
          });

          // rune
          const runeName =
            skillUsage.runeName === '' ? '미착용' : skillUsage.runeName;
          this.addCount(
            statsSkillSetting[classEngraveName][skillUsage.skillName]['runes'],
            runeName,
          );
        });
      }
    });

    return statsSkillSetting;
  }
}
