import { Model } from 'mongoose';
import { RewardService } from '../reward.service';
import { RewardChaos } from '../schemas/rewardChaos.schema';
import { RewardGuardian } from '../schemas/rewardGuardian.schema';
import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { BadRequestException } from '@nestjs/common';

class MockRewardChaosModel {
  datas = [
    {
      level: 'level1',
      count: 1,
      silling: 1,
      shard: 1,
      destruction: 1,
      protection: 1,
      leapStone: 1,
      gem: 1,
    },
    {
      level: 'level2',
      count: 2,
      silling: 2,
      shard: 2,
      destruction: 2,
      protection: 2,
      leapStone: 2,
      gem: 2,
    },
  ];

  find = jest.fn((filter) => {
    if (filter) {
      return this.datas.filter((data) => data.level === filter.level);
    } else {
      return this.datas;
    }
  });

  create = jest.fn((createRewardChaosDto) => {
    return this.datas[this.datas.push(createRewardChaosDto) - 1];
  });
}

class MockRewardGuardianModel {
  datas = [
    {
      level: 'level1',
      count: 1,
      destruction: 1,
      protection: 1,
      leapStone: 1,
    },
    {
      level: 'level2',
      count: 2,
      destruction: 2,
      protection: 2,
      leapStone: 2,
    },
  ];

  find = jest.fn((filter) => {
    if (filter) {
      return this.datas.filter((data) => data.level === filter.level);
    } else {
      return this.datas;
    }
  });

  create = jest.fn((createRewardGuardianDto) => {
    return this.datas[this.datas.push(createRewardGuardianDto) - 1];
  });
}

describe('RewardService', () => {
  let rewardService: RewardService;
  let rewardChaosModel: Model<RewardChaos>;
  let rewardGuardianModel: Model<RewardGuardian>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RewardService,
        {
          provide: getModelToken(RewardChaos.name),
          useClass: MockRewardChaosModel,
        },
        {
          provide: getModelToken(RewardGuardian.name),
          useClass: MockRewardGuardianModel,
        },
      ],
    }).compile();

    rewardService = module.get<RewardService>(RewardService);
    rewardChaosModel = module.get<Model<RewardChaos>>(
      getModelToken(RewardChaos.name),
    );
    rewardGuardianModel = module.get<Model<RewardGuardian>>(
      getModelToken(RewardGuardian.name),
    );
  });

  describe('findRewards()', () => {
    it('return an array of ChaosDatas', async () => {
      const result = await rewardService.findRewards('chaos');
      const expected = [
        {
          level: 'level1',
          count: 1,
          silling: 1,
          shard: 1,
          destruction: 1,
          protection: 1,
          leapStone: 1,
          gem: 1,
        },
        {
          level: 'level2',
          count: 2,
          silling: 2,
          shard: 2,
          destruction: 2,
          protection: 2,
          leapStone: 2,
          gem: 2,
        },
      ];
      const spyFind = jest.spyOn(rewardChaosModel, 'find');

      expect(result).toStrictEqual(expected);
      expect(spyFind).toBeCalledTimes(1);
    });

    it('return an array of GuardianDatas', async () => {
      const result = await rewardService.findRewards('guardian');
      const expected = [
        {
          level: 'level1',
          count: 1,
          destruction: 1,
          protection: 1,
          leapStone: 1,
        },
        {
          level: 'level2',
          count: 2,
          destruction: 2,
          protection: 2,
          leapStone: 2,
        },
      ];
      const spyFind = jest.spyOn(rewardGuardianModel, 'find');

      expect(result).toStrictEqual(expected);
      expect(spyFind).toBeCalledTimes(1);
    });

    it('throw BadRequestException', async () => {
      try {
        await rewardService.findRewards('throw exception');
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
      }
    });
  });

  describe('findRewardsByLevel()', () => {
    it('find an array of ChaosDatas by level', async () => {
      const result = await rewardService.findRewardsByLevel('chaos', 'level1');
      const expected = [
        {
          level: 'level1',
          count: 1,
          silling: 1,
          shard: 1,
          destruction: 1,
          protection: 1,
          leapStone: 1,
          gem: 1,
        },
      ];
      const spyFind = jest.spyOn(rewardChaosModel, 'find');

      expect(result).toStrictEqual(expected);
      expect(spyFind).toBeCalledTimes(1);
    });

    it('find an array of GuardianDatas by level', async () => {
      const result = await rewardService.findRewardsByLevel(
        'guardian',
        'level1',
      );
      const expected = [
        {
          level: 'level1',
          count: 1,
          destruction: 1,
          protection: 1,
          leapStone: 1,
        },
      ];
      const spyFind = jest.spyOn(rewardGuardianModel, 'find');

      expect(result).toStrictEqual(expected);
      expect(spyFind).toBeCalledTimes(1);
    });

    it('throw BadRequestException', async () => {
      try {
        await rewardService.findRewardsByLevel('throw exception', 'level1');
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
      }
    });
  });

  describe('createRewardChaos()', () => {
    it('create new RewardChaos', async () => {
      const createRewardChaosDto = {
        level: 'newLevel',
        count: 123,
        silling: 123,
        shard: 123,
        destruction: 123,
        protection: 123,
        leapStone: 123,
        gem: 123,
      };
      const result = await rewardService.createRewardChaos(
        createRewardChaosDto,
      );
      const spyCreate = jest.spyOn(rewardChaosModel, 'create');

      expect(result).toStrictEqual(createRewardChaosDto);
      expect(spyCreate).toBeCalledTimes(1);
    });
  });

  describe('createRewardGuardian()', () => {
    it('create new RewardGuardian', async () => {
      const createRewardGuardianDto = {
        level: 'newLevel',
        count: 123,
        destruction: 123,
        protection: 123,
        leapStone: 123,
      };
      const result = await rewardService.createRewardGuardian(
        createRewardGuardianDto,
      );
      const spyCreate = jest.spyOn(rewardGuardianModel, 'create');

      expect(result).toStrictEqual(createRewardGuardianDto);
      expect(spyCreate).toBeCalledTimes(1);
    });
  });
});
