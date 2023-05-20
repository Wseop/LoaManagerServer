import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Engrave, StatsSetting } from './schemas/stats-setting.schema';
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
    // engraves 정렬
    // 1. level 기준 내림차순
    // 2. code 기준 오름차순
    createStatsSettingDto.engraves.sort((a: Engrave, b: Engrave) => {
      if (a.level === b.level) {
        return a.code - b.code;
      } else {
        return b.level - a.level;
      }
    });

    return await this.statsSettingModel.findOneAndUpdate(
      {
        characterName: createStatsSettingDto.characterName,
      },
      createStatsSettingDto,
      { upsert: true, new: true },
    );
  }
}
