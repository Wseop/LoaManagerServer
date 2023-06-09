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

@Injectable()
export class StatisticsService {
  constructor(
    private readonly chaosRewardsService: ChaosRewardsService,
    private readonly guardianRewardsService: GuardianRewardsService,
    private readonly skillSettingsService: SkillSettingsService,
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
    else classEngraveNames.push('쌍직각');

    // StatsSkillSetting 초기화
    const statisticsSkill: StatisticsSkill = {
      count: 0,
    };
    for (const classEngraveName of classEngraveNames) {
      statisticsSkill[classEngraveName] = {
        count: 0,
      };
    }

    // skillSetting 데이터 합산
    (
      await this.skillSettingsService.findSkillSettingsByClassName(className)
    ).forEach((skillSetting) => {
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
            : statisticsSkill[skillSetting.classEngrave][skillUsage.skillName][
                'count'
              ]++;

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
              statisticsSkill[skillSetting.classEngrave][skillUsage.skillName][
                'tripods'
              ],
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
    });

    return statisticsSkill;
  }
}
