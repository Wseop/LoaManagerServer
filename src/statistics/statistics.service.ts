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

@Injectable()
export class StatisticsService {
  constructor(
    private readonly chaosRewardsService: ChaosRewardsService,
    private readonly guardianRewardsService: GuardianRewardsService,
    private readonly armorySettingsService: ArmorySettingsService,
    private readonly skillSettingsService: SkillSettingsService,
  ) {}

  async getStatsChaosReward(level: string) {
    const chaosRewards: ChaosReward[] =
      await this.chaosRewardsService.findChaosRewardByLevel(level);
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
      await this.guardianRewardsService.findGuardianRewardByLevel(level);
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
}
