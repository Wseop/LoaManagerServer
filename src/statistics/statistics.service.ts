import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { StatsChaos } from './schemas/stats-chaos.schema';
import { StatsGuardian } from './schemas/stats-guardian.schema';
import { StatsSetting } from './schemas/stats-setting.schema';
import { StatsSkill } from './schemas/stats-skill.schema';
import { StatsCategory } from './enums/statistics-category.enum';
import { CreateStatsChaosDto } from './dto/create-stats-chaos.dto';
import { CreateStatsGuardianDto } from './dto/create-stats-guardian.dto';
import { CreateStatsSettingDto } from './dto/create-stats-setting.dto';
import { CreateStatsSkillDto } from './dto/create-stats-skill.dto';
import { TotalStatsChaos } from './interfaces/total-stats-chaos.interface';
import { TotalStatsGuardian } from './interfaces/total-stats-guardian.interface';

@Injectable()
export class StatisticsService {
  constructor(
    @InjectModel(StatsChaos.name)
    private readonly statsChaosModel: Model<StatsChaos>,
    @InjectModel(StatsGuardian.name)
    private readonly statsGuardianModel: Model<StatsGuardian>,
    @InjectModel(StatsSetting.name)
    private readonly statsSettingModel: Model<StatsSetting>,
    @InjectModel(StatsSkill.name)
    private readonly statsSkillModel: Model<StatsSkill>,
  ) {}

  async findTotalStatsByLevel(category: StatsCategory, level: string) {
    let totalStats: TotalStatsChaos | TotalStatsGuardian;

    // TotalStats 초기화
    if (category === StatsCategory.Chaos) {
      totalStats = {
        count: 0,
        level: level,
        items: [
          'silling',
          'shard',
          'destruction',
          'protection',
          'leapStone',
          'gem',
        ],
        itemCounts: Array.from({ length: 6 }, () => 0),
      };
    } else if (category === StatsCategory.Guardian) {
      totalStats = {
        count: 0,
        level: level,
        items: ['destruction', 'protection', 'leapStone'],
        itemCounts: Array.from({ length: 3 }, () => 0),
      };
    } else {
      return null;
    }

    // Stats 데이터 합산
    const statsDatas = await this.findStatsByLevel(category, level);

    if (statsDatas.length > 0) {
      for (const statsData of statsDatas) {
        for (let i = 0; i < totalStats.items.length; i++) {
          totalStats.itemCounts[i] += statsData[totalStats.items[i]];
        }
      }

      totalStats.count = statsDatas.length;
    }

    return totalStats;
  }

  async findStats(category: StatsCategory) {
    switch (category) {
      case StatsCategory.Chaos:
        return await this.statsChaosModel.find();
      case StatsCategory.Guardian:
        return await this.statsGuardianModel.find();
      case StatsCategory.Setting:
        return await this.statsSettingModel.find();
      case StatsCategory.Skill:
        return await this.statsSkillModel.find();
      default:
        return null;
    }
  }

  async findStatsByLevel(category: StatsCategory, level: string) {
    switch (category) {
      case StatsCategory.Chaos:
        return await this.statsChaosModel.find({ level });
      case StatsCategory.Guardian:
        return await this.statsGuardianModel.find({ level });
      default:
        return null;
    }
  }

  async findStatsByClass(category: StatsCategory, className: string) {
    switch (category) {
      case StatsCategory.Setting:
        return await this.statsSettingModel.find({ className });
      case StatsCategory.Skill:
        return await this.statsSkillModel.find({ className });
      default:
        return null;
    }
  }

  async createStats(
    category: StatsCategory,
    newStatsDto:
      | CreateStatsChaosDto
      | CreateStatsGuardianDto
      | CreateStatsSettingDto
      | CreateStatsSkillDto,
  ) {
    switch (category) {
      case StatsCategory.Chaos:
        return await this.statsChaosModel.create(newStatsDto);
      case StatsCategory.Guardian:
        return await this.statsGuardianModel.create(newStatsDto);
      case StatsCategory.Setting:
        return await this.statsSettingModel.findOneAndUpdate(
          {
            characterName: (newStatsDto as CreateStatsSettingDto).characterName,
          },
          newStatsDto,
          { upsert: true, new: true },
        );
      case StatsCategory.Skill:
        return await this.statsSkillModel.findOneAndUpdate(
          { characterName: (newStatsDto as CreateStatsSkillDto).characterName },
          newStatsDto,
          { upsert: true, new: true },
        );
      default:
        return null;
    }
  }
}
