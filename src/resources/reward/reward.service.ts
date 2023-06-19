import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Reward } from './schemas/reward.schema';
import { Model } from 'mongoose';
import { CreateRewardDto } from './dto/create-reward.dto';
import { RewardDto } from './dto/reward.dto';

@Injectable()
export class RewardService {
  constructor(
    @InjectModel(Reward.name) private readonly rewardModel: Model<Reward>,
  ) {}

  async findRewards(): Promise<RewardDto[]> {
    return await this.rewardModel.find({}, { _id: 0 });
  }

  async findRewardByContent(content: string): Promise<RewardDto> {
    return await this.rewardModel.findOne({ content }, { _id: 0 });
  }

  async createReward(createRewardDto: CreateRewardDto): Promise<RewardDto> {
    return await this.rewardModel.create(createRewardDto);
  }

  async replaceReward(replaceRewardDto: CreateRewardDto): Promise<RewardDto> {
    const replaceResult = await this.rewardModel.replaceOne(
      { content: replaceRewardDto.content },
      replaceRewardDto,
    );

    if (replaceResult.matchedCount === 0) {
      return null;
    } else {
      return await this.rewardModel.findOne(
        {
          content: replaceRewardDto.content,
        },
        { _id: 0 },
      );
    }
  }
}
