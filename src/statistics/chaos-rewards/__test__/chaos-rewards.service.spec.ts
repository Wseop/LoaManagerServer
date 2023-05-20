import { Model } from 'mongoose';
import { ChaosRewardsService } from '../chaos-rewards.service';
import { ChaosReward } from '../schemas/chaos-reward.schema';
import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';

const mockChaosReward: ChaosReward = {
  level: 'string',
  count: 0,
  silling: 0,
  shard: 0,
  destructionStone: 0,
  protectionStone: 0,
  leapStone: 0,
  gem: 0,
};

class MockChaosRewardModel {
  find = jest.fn().mockResolvedValue(mockChaosReward);
  create = jest.fn().mockResolvedValue(mockChaosReward);
}

describe('ChaosRewardService', () => {
  let chaosRewardService: ChaosRewardsService;
  let chaosRewardModel: Model<ChaosReward>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ChaosRewardsService,
        {
          provide: getModelToken(ChaosReward.name),
          useClass: MockChaosRewardModel,
        },
      ],
    }).compile();

    chaosRewardService = module.get<ChaosRewardsService>(ChaosRewardsService);
    chaosRewardModel = module.get<Model<ChaosReward>>(
      getModelToken(ChaosReward.name),
    );
  });

  describe('findChaosRewardes', () => {
    it('should return chaosReward', async () => {
      const result = await chaosRewardService.findChaosRewardes();
      expect(result).toStrictEqual(mockChaosReward);
      expect(jest.spyOn(chaosRewardModel, 'find')).toBeCalledTimes(1);
    });
  });

  describe('findChaosRewardByLevel', () => {
    it('should return chaosReward', async () => {
      const result = await chaosRewardService.findChaosRewardByLevel('level');
      expect(result).toStrictEqual(mockChaosReward);
      expect(jest.spyOn(chaosRewardModel, 'find')).toBeCalledTimes(1);
    });
  });

  describe('createChaosReward', () => {
    it('should return chaosReward', async () => {
      const result = await chaosRewardService.createChaosReward(
        mockChaosReward,
      );
      expect(result).toStrictEqual(mockChaosReward);
      expect(jest.spyOn(chaosRewardModel, 'create')).toBeCalledTimes(1);
    });
  });
});
