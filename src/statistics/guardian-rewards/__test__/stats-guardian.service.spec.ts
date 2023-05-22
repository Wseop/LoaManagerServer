import { Model } from 'mongoose';
import { GuardianReward } from '../schemas/guardian-reward.schema';
import { GuardianRewardsService } from '../guardian-rewards.service';
import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';

const mockGuardianReward: GuardianReward = {
  level: 'string',
  count: 0,
  destructionStone: 0,
  protectionStone: 0,
  leapStone: 0,
};

class MockGuardianRewardModel {
  find = jest.fn().mockResolvedValue(mockGuardianReward);
  create = jest.fn().mockResolvedValue(mockGuardianReward);
}

describe('GuardianRewardService', () => {
  let guardianRewardService: GuardianRewardsService;
  let guardianRewardModel: Model<GuardianReward>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GuardianRewardsService,
        {
          provide: getModelToken(GuardianReward.name),
          useClass: MockGuardianRewardModel,
        },
      ],
    }).compile();

    guardianRewardService = module.get<GuardianRewardsService>(
      GuardianRewardsService,
    );
    guardianRewardModel = module.get<Model<GuardianReward>>(
      getModelToken(GuardianReward.name),
    );
  });

  describe('findGuardianRewardes', () => {
    it('should return guardianReward', async () => {
      const result = await guardianRewardService.findGuardianRewards();
      expect(result).toStrictEqual(mockGuardianReward);
      expect(jest.spyOn(guardianRewardModel, 'find')).toBeCalledTimes(1);
    });
  });

  describe('findGuardianRewardByLevel', () => {
    it('should return guardianReward', async () => {
      const result = await guardianRewardService.findGuardianRewardsByLevel(
        'level',
      );
      expect(result).toStrictEqual(mockGuardianReward);
      expect(jest.spyOn(guardianRewardModel, 'find')).toBeCalledTimes(1);
    });
  });

  describe('createGuardianReward', () => {
    it('should return guardianReward', async () => {
      const result = await guardianRewardService.createGuardianReward(
        mockGuardianReward,
      );
      expect(result).toStrictEqual(mockGuardianReward);
      expect(jest.spyOn(guardianRewardModel, 'create')).toBeCalledTimes(1);
    });
  });
});
