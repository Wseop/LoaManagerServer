import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { StatsChaos } from './schemas/stats-chaos.schema';
import { StatsGuardian } from './schemas/stats-guardian.schema';
import { StatsSetting } from './schemas/stats-setting.schema';
import { StatsSkill } from './schemas/stats-skill.schema';
import { StatsCategory } from './enums/statistics-category.enum';

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

  async findStatsByLevel(category: string, level: string) {
    if (category === StatsCategory.Chaos) {
      return await this.statsChaosModel.find({ level });
    } else if (category === StatsCategory.Guardian) {
      return await this.statsGuardianModel.find({ level });
    }
  }

  async findStatsByClass(category: string, className: string) {
    if (category === StatsCategory.Setting) {
      return await this.statsSettingModel.find({ className });
    } else if (category === StatsCategory.Skill) {
      return await this.statsSkillModel.find({ className });
    }
  }

  async createStats(category: string, newStatsDto) {
    if (category === StatsCategory.Chaos) {
      return await this.statsChaosModel.create(newStatsDto);
    } else if (category === StatsCategory.Guardian) {
      return await this.statsGuardianModel.create(newStatsDto);
    } else if (category === StatsCategory.Setting) {
      return await this.statsSettingModel.findOneAndUpdate(
        { characterName: newStatsDto.characterName },
        newStatsDto,
        { upsert: true, new: true },
      );
    } else if (category === StatsCategory.Skill) {
      return await this.statsSkillModel.findOneAndUpdate(
        { characterName: newStatsDto.characterName },
        newStatsDto,
        { upsert: true, new: true },
      );
    }
  }
}
