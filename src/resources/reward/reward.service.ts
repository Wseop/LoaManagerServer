import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Reward } from './schemas/reward.schema';
import { Model } from 'mongoose';
import { CreateRewardDto } from './dto/create-reward.dto';

@Injectable()
export class RewardService {
  constructor(
    @InjectModel(Reward.name) private readonly rewardModel: Model<Reward>,
  ) {}

  async findRewards() {
    return await this.rewardModel.find();
  }

  async findRewardByContent(content: string) {
    return await this.rewardModel.findOne({ content });
  }

  async createReward(createRewardDto: CreateRewardDto) {
    return await this.rewardModel.create(createRewardDto);
  }

  async replaceReward(replaceRewardDto: CreateRewardDto) {
    const replaceResult = await this.rewardModel.replaceOne(
      { content: replaceRewardDto.content },
      replaceRewardDto,
    );

    if (replaceResult.matchedCount === 0) {
      return null;
    } else {
      return await this.rewardModel.findOne({
        content: replaceRewardDto.content,
      });
    }
  }
}
