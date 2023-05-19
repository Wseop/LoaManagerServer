import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { StatsSetting } from './schemas/stats-setting.schema';
import { Model } from 'mongoose';
import { CreateStatsSettingDto } from './dto/create-stats-setting.dto';

@Injectable()
export class StatsSettingService {
  constructor(
    @InjectModel(StatsSetting.name)
    private readonly statsSettingModel: Model<StatsSetting>,
  ) {}

  async findStatsSettings() {
    return await this.statsSettingModel.find();
  }

  async findStatsSettingByClassName(className: string) {
    return await this.statsSettingModel.find({ className });
  }

  async createStatsSetting(createStatsSettingDto: CreateStatsSettingDto) {
    return await this.statsSettingModel.findOneAndUpdate(
      {
        characterName: createStatsSettingDto.characterName,
      },
      createStatsSettingDto,
      { upsert: true, new: true },
    );
  }
}
