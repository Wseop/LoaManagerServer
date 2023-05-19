import { Injectable } from '@nestjs/common';
import { StatsCategory } from './enums/statistics-category.enum';
import { CreateStatsChaosDto } from './chaos/dto/create-stats-chaos.dto';
import { CreateStatsGuardianDto } from './guardian/dto/create-stats-guardian.dto';
import { CreateStatsSettingDto } from './setting/dto/create-stats-setting.dto';
import { CreateStatsSkillDto } from './skill/dto/create-stats-skill.dto';
import { TotalStatsChaos } from './chaos/interfaces/total-stats-chaos.interface';
import { TotalStatsGuardian } from './guardian/interfaces/total-stats-guardian.interface';
import { StatsChaosService } from './chaos/stats-chaos.service';
import { StatsGuardianService } from './guardian/stats-guardian.service';
import { StatsSettingService } from './setting/stats-setting.service';
import { StatsSkillService } from './skill/stats-skill.service';

@Injectable()
export class StatisticsService {
  constructor(
    private readonly statsChaosService: StatsChaosService,
    private readonly statsGuardianService: StatsGuardianService,
    private readonly statsSettingService: StatsSettingService,
    private readonly statsSkillService: StatsSkillService,
  ) {}

  async getTotalStats(category: StatsCategory, level: string) {
    let totalStats: TotalStatsChaos | TotalStatsGuardian;
    let statsDatas;

    // totalStats 초기화 및 stats 데이터 로드
    if (category === StatsCategory.Chaos) {
      totalStats = {
        count: 0,
        level: level,
        itemCounts: {
          silling: 0,
          shard: 0,
          destruction: 0,
          protection: 0,
          leapStone: 0,
          gem: 0,
        },
      };
      statsDatas = await this.statsChaosService.findStatsChaosByLevel(level);
    } else if (category === StatsCategory.Guardian) {
      totalStats = {
        count: 0,
        level: level,
        itemCounts: {
          destruction: 0,
          protection: 0,
          leapStone: 0,
        },
      };
      statsDatas = await this.statsGuardianService.findStatsGuardianByLevel(
        level,
      );
    } else {
      return null;
    }

    const items = Object.keys(totalStats.itemCounts);

    // stats 데이터 합산
    if (statsDatas.length > 0) {
      for (const statsData of statsDatas) {
        for (const item of items) {
          totalStats.itemCounts[item] += statsData[item];
        }
      }

      totalStats.count = statsDatas.length;
    }

    return totalStats;
  }

  async createStats(
    category: StatsCategory,
    createStatsDto:
      | CreateStatsChaosDto
      | CreateStatsGuardianDto
      | CreateStatsSettingDto
      | CreateStatsSkillDto,
  ) {
    switch (category) {
      case StatsCategory.Chaos:
        return await this.statsChaosService.createStatsChaos(
          createStatsDto as CreateStatsChaosDto,
        );
      case StatsCategory.Guardian:
        return await this.statsGuardianService.createStatsGuardian(
          createStatsDto as CreateStatsGuardianDto,
        );
      case StatsCategory.Setting:
        return await this.statsSettingService.createStatsSetting(
          createStatsDto as CreateStatsSettingDto,
        );
      case StatsCategory.Skill:
        return await this.statsSkillService.createStatsSkill(
          createStatsDto as CreateStatsSkillDto,
        );
      default:
        return null;
    }
  }
}
