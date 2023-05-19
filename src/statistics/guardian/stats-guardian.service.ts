import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { StatsGuardian } from './schemas/stats-guardian.schema';
import { Model } from 'mongoose';
import { CreateStatsGuardianDto } from './dto/create-stats-guardian.dto';

@Injectable()
export class StatsGuardianService {
  constructor(
    @InjectModel(StatsGuardian.name)
    private readonly statsGuardianModel: Model<StatsGuardian>,
  ) {}

  async findStatsGuardians() {
    return await this.statsGuardianModel.find();
  }

  async findStatsGuardianByLevel(level: string) {
    return await this.statsGuardianModel.find({ level });
  }

  async createStatsGuardian(createStatsGuardianDto: CreateStatsGuardianDto) {
    return await this.statsGuardianModel.create(createStatsGuardianDto);
  }
}
