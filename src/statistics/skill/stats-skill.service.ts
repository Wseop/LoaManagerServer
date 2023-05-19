import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { StatsSkill } from './schemas/stats-skill.schema';
import { CreateStatsSkillDto } from './dto/create-stats-skill.dto';

@Injectable()
export class StatsSkillService {
  constructor(
    @InjectModel(StatsSkill.name)
    private readonly statsSkillModel: Model<StatsSkill>,
  ) {}

  async findStatsSkills() {
    return await this.statsSkillModel.find();
  }

  async findStatsSkillByClassName(className: string) {
    return await this.statsSkillModel.find({ className });
  }

  async createStatsSkill(createStatsSkillDto: CreateStatsSkillDto) {
    return await this.statsSkillModel.findOneAndUpdate(
      { characterName: createStatsSkillDto.characterName },
      createStatsSkillDto,
      { upsert: true, new: true },
    );
  }
}
