import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { StatisticChaos } from './schemas/statistic-chaos.schema';
import { CreateStatisticChaosDto } from './dto/create-statistic-chaos.dto';
import { StatisticChaosDto } from './dto/statistic-chaos.dto';

@Injectable()
export class StatisticChaosService {
  constructor(
    @InjectModel(StatisticChaos.name)
    private readonly statisticChaosModel: Model<StatisticChaos>,
  ) {}

  async find(): Promise<StatisticChaos[]> {
    return await this.statisticChaosModel.find();
  }

  async findByLevel(level: string): Promise<StatisticChaos[]> {
    return await this.statisticChaosModel.find({ level });
  }

  async create(
    createChaosRewardDto: CreateStatisticChaosDto,
  ): Promise<StatisticChaos> {
    const result = await this.statisticChaosModel.create(createChaosRewardDto);

    return {
      level: result.level,
      count: result.count,
      silling: result.silling,
      shard: result.shard,
      destructionStone: result.destructionStone,
      protectionStone: result.protectionStone,
      leapStone: result.leapStone,
      gem: result.gem,
    };
  }

  async getStatisticChaos(level: string): Promise<StatisticChaosDto> {
    const statisticChaos: StatisticChaosDto = {
      count: 0,
      level: level,
      silling: 0,
      shard: 0,
      destructionStone: 0,
      protectionStone: 0,
      leapStone: 0,
      gem: 0,
    };

    (await this.findByLevel(level)).forEach((value) => {
      statisticChaos.count += value.count;
      statisticChaos.silling += value.silling;
      statisticChaos.shard += value.shard;
      statisticChaos.destructionStone += value.destructionStone;
      statisticChaos.protectionStone += value.protectionStone;
      statisticChaos.leapStone += value.leapStone;
      statisticChaos.gem += value.gem;
    });

    return statisticChaos;
  }
}
