import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { GuardianReward } from './schemas/guardian-reward.schema';
import { Model } from 'mongoose';
import { CreateGuardianRewardDto } from './dto/create-guardian-reward.dto';

@Injectable()
export class GuardianRewardsService {
  constructor(
    @InjectModel(GuardianReward.name)
    private readonly guardianRewardModel: Model<GuardianReward>,
  ) {}

  async findGuardianRewards() {
    return await this.guardianRewardModel.find();
  }

  async findGuardianRewardsByLevel(level: string) {
    return await this.guardianRewardModel.find({ level });
  }

  async createGuardianReward(createGuardianRewardDto: CreateGuardianRewardDto) {
    return await this.guardianRewardModel.create(createGuardianRewardDto);
  }
}
