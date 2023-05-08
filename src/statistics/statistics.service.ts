import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { StatsChaos } from './schemas/statsChaos.schema';
import { StatsGuardian } from './schemas/statsGuardian.schema';
import { StatsSetting } from './schemas/statsSetting.schema';
import { StatsSkill } from './schemas/statsSkill.schema';

@Injectable()
export class StatisticsService {
  constructor(
    @InjectModel(StatsChaos.name)
    private readonly chaosStatsModel: Model<StatsChaos>,

    @InjectModel(StatsGuardian.name)
    private readonly guardianStatsModel: Model<StatsGuardian>,

    @InjectModel(StatsSetting.name)
    private readonly settingStatsModel: Model<StatsSetting>,

    @InjectModel(StatsSkill.name)
    private readonly skillStatsModel: Model<StatsSkill>,
  ) {}

  async findStatsByLevel(category: string, level: string) {
    if (category === 'chaos') {
      return await this.chaosStatsModel.find({ level });
    } else if (category === 'guardian') {
      return await this.guardianStatsModel.find({ level });
    }
  }

  async findStatsByClass(category: string, className: string) {
    if (category === 'setting') {
      return await this.settingStatsModel.find({ className });
    } else if (category === 'skill') {
      return await this.skillStatsModel.find({ className });
    }
  }

  async createStats(category: string, newStatsDto) {
    if (category === 'chaos') {
      return await this.chaosStatsModel.create(newStatsDto);
    } else if (category === 'guardian') {
      return await this.guardianStatsModel.create(newStatsDto);
    } else if (category === 'setting') {
      return await this.settingStatsModel.findOneAndUpdate(
        { characterName: newStatsDto.characterName },
        newStatsDto,
        { upsert: true, new: true },
      );
    } else if (category === 'skill') {
      return await this.skillStatsModel.findOneAndUpdate(
        { characterName: newStatsDto.characterName },
        newStatsDto,
        { upsert: true, new: true },
      );
    }
  }
}
