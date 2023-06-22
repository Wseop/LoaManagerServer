import { Model } from 'mongoose';
import { RewardService } from '../reward.service';
import { Reward } from '../schemas/reward.schema';
import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';

const mockReward: Reward = {
  content: 'string',
  rewards: [
    {
      level: 'string',
      cost: 0,
      items: [
        {
          item: 'string',
          count: 0,
        },
      ],
    },
  ],
};

class MockRewardModel {
  find = jest.fn().mockResolvedValue(mockReward);
  findOne = jest.fn().mockResolvedValue(mockReward);
  create = jest.fn().mockResolvedValue(mockReward);
  replaceOne = jest.fn();
}

describe('RewardService', () => {
  let rewardService: RewardService;
  let rewardModel: Model<Reward>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RewardService,
        {
          provide: getModelToken(Reward.name),
          useClass: MockRewardModel,
        },
      ],
    }).compile();

    rewardService = module.get<RewardService>(RewardService);
    rewardModel = module.get<Model<Reward>>(getModelToken(Reward.name));
  });

  describe('findRewards', () => {
    it('should return reward', async () => {
      const result = await rewardService.find();
      expect(result).toStrictEqual(mockReward);
      expect(jest.spyOn(rewardModel, 'find')).toBeCalledTimes(1);
    });
  });

  describe('createReward', () => {
    it('should return reward', async () => {
      const result = await rewardService.create(mockReward);
      expect(result).toStrictEqual(mockReward);
      expect(jest.spyOn(rewardModel, 'create')).toBeCalledTimes(1);
    });
  });

  describe('replaceReward', () => {
    it('should return null', async () => {
      jest.spyOn(rewardModel, 'replaceOne').mockResolvedValue({
        acknowledged: false,
        matchedCount: 0,
        modifiedCount: 0,
        upsertedCount: 0,
        upsertedId: null,
      });

      const result = await rewardService.replaceOne(mockReward);
      expect(result).toBe(null);
      expect(jest.spyOn(rewardModel, 'replaceOne')).toBeCalledTimes(1);
      expect(jest.spyOn(rewardModel, 'findOne')).toBeCalledTimes(0);
    });

    it('should return reward', async () => {
      jest.spyOn(rewardModel, 'replaceOne').mockResolvedValue({
        acknowledged: false,
        matchedCount: 1,
        modifiedCount: 0,
        upsertedCount: 0,
        upsertedId: null,
      });

      const result = await rewardService.replaceOne(mockReward);
      expect(result).toStrictEqual(mockReward);
      expect(jest.spyOn(rewardModel, 'replaceOne')).toBeCalledTimes(1);
      expect(jest.spyOn(rewardModel, 'findOne')).toBeCalledTimes(1);
    });
  });
});
