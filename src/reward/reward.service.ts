import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { RewardChaos } from './schemas/rewardChaos.schema';
import { Model } from 'mongoose';
import { RewardGuardian } from './schemas/rewardGuardian.schema';
import { CreateRewardChaosDto } from './dto/createRewardChaos.dto';
import { CreateRewardGuardianDto } from './dto/createRewardGuardian.dto';

@Injectable()
export class RewardService {
  constructor(
    @InjectModel(RewardChaos.name)
    private readonly rewardChaosModel: Model<RewardChaos>,

    @InjectModel(RewardGuardian.name)
    private readonly rewardGuardianModel: Model<RewardGuardian>,
  ) {}

  async findRewards(category: string) {
    if (category === 'chaos') {
      return await this.rewardChaosModel.find().exec();
    } else if (category === 'guardian') {
      return await this.rewardGuardianModel.find().exec();
    } else {
      throw new BadRequestException();
    }
  }

  async findRewardsByLevel(category: string, level: string) {
    if (category === 'chaos') {
      return await this.rewardChaosModel.find({ level }).exec();
    } else if (category === 'guardian') {
      return await this.rewardGuardianModel.find({ level }).exec();
    } else {
      throw new BadRequestException();
    }
  }

  async createRewardChaos(createRewardChaosDto: CreateRewardChaosDto) {
    return await this.rewardChaosModel.create(createRewardChaosDto);
  }

  async createRewardGuardian(createRewardGuardianDto: CreateRewardGuardianDto) {
    return await this.rewardGuardianModel.create(createRewardGuardianDto);
  }
}
