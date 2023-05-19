import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { StatsChaos } from './schemas/stats-chaos.schema';
import { CreateStatsChaosDto } from './dto/create-stats-chaos.dto';

@Injectable()
export class StatsChaosService {
  constructor(
    @InjectModel(StatsChaos.name)
    private readonly statsChaosModel: Model<StatsChaos>,
  ) {}

  async findStatsChaoses() {
    return await this.statsChaosModel.find();
  }

  async findStatsChaosByLevel(level: string) {
    return await this.statsChaosModel.find({ level });
  }

  async createStatsChaos(createStatsChaosDto: CreateStatsChaosDto) {
    return await this.statsChaosModel.create(createStatsChaosDto);
  }
}
