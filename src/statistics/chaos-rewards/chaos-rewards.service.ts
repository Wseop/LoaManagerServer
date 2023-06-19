import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ChaosReward } from './schemas/chaos-reward.schema';
import { CreateChaosRewardDto } from './dto/create-chaos-reward.dto';

@Injectable()
export class ChaosRewardsService {
  constructor(
    @InjectModel(ChaosReward.name)
    private readonly statsChaosModel: Model<ChaosReward>,
  ) {}

  async findChaosRewards(): Promise<ChaosReward[]> {
    return await this.statsChaosModel.find();
  }

  async findChaosRewardsByLevel(level: string): Promise<ChaosReward[]> {
    return await this.statsChaosModel.find({ level });
  }

  async createChaosReward(
    createChaosRewardDto: CreateChaosRewardDto,
  ): Promise<ChaosReward> {
    return await this.statsChaosModel.create(createChaosRewardDto);
  }
}
