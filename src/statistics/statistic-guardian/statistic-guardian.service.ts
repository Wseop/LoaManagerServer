import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { StatisticGuardian } from './schemas/statistic-guardian.schema';
import { CreateStatisticGuardianDto } from './dto/create-statistic-guardian.dto';
import { StatisticGuardianDto } from './dto/statistic-guardian.dto';

@Injectable()
export class StatisticGuardianService {
  constructor(
    @InjectModel(StatisticGuardian.name)
    private readonly statisticGuardianModel: Model<StatisticGuardian>,
  ) {}

  async find(): Promise<StatisticGuardian[]> {
    return await this.statisticGuardianModel.find();
  }

  async findByLevel(level: string): Promise<StatisticGuardian[]> {
    return await this.statisticGuardianModel.find({ level });
  }

  async create(
    createGuardianRewardDto: CreateStatisticGuardianDto,
  ): Promise<StatisticGuardian> {
    const result = await this.statisticGuardianModel.create(
      createGuardianRewardDto,
    );

    return {
      level: result.level,
      count: result.count,
      destructionStone: result.destructionStone,
      protectionStone: result.protectionStone,
      leapStone: result.leapStone,
    };
  }

  async getStatisticGuardian(level: string): Promise<StatisticGuardianDto> {
    const statisticGuardian: StatisticGuardianDto = {
      level: level,
      count: 0,
      destructionStone: 0,
      protectionStone: 0,
      leapStone: 0,
    };

    (await this.findByLevel(level)).forEach((value) => {
      statisticGuardian.count += value.count;
      statisticGuardian.destructionStone += value.destructionStone;
      statisticGuardian.protectionStone += value.protectionStone;
      statisticGuardian.leapStone += value.leapStone;
    });

    return statisticGuardian;
  }
}
