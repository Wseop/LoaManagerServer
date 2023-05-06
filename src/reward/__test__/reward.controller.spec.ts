import { Test, TestingModule } from '@nestjs/testing';
import { RewardController } from '../reward.controller';
import { RewardService } from '../reward.service';
import { CreateRewardChaosDto } from '../dto/createRewardChaos.dto';
import { CreateRewardGuardianDto } from '../dto/createRewardGuardian.dto';

class MockRewardService {
  chaosDatas = [
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
  guardianDatas = [
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

  findRewards = jest.fn((category) => {
    if (category === 'chaos') {
      return this.chaosDatas;
    } else if (category === 'guardian') {
      return this.guardianDatas;
    }
  });

  findRewardsByLevel = jest.fn((category, level) => {
    if (category === 'chaos') {
      return this.chaosDatas.filter((data) => data.level === level);
    } else if (category === 'guardian') {
      return this.guardianDatas.filter((data) => data.level === level);
    }
  });

  createRewardChaos = jest.fn((createRewardChaosDto: CreateRewardChaosDto) => {
    this.chaosDatas.push(createRewardChaosDto);
    return this.chaosDatas[this.chaosDatas.length - 1];
  });

  createRewardGuardian = jest.fn(
    (createRewardGuardianDto: CreateRewardGuardianDto) => {
      this.guardianDatas.push(createRewardGuardianDto);
      return this.guardianDatas[this.guardianDatas.length - 1];
    },
  );
}

describe('RewardController', () => {
  let rewardController: RewardController;
  let rewardService: RewardService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RewardController],
      providers: [
        {
          provide: RewardService,
          useClass: MockRewardService,
        },
      ],
    }).compile();

    rewardController = module.get<RewardController>(RewardController);
    rewardService = module.get<RewardService>(RewardService);
  });

  describe('findRewards()', () => {
    it('return an array of ChaosDatas', () => {
      const result = rewardController.findRewards('chaos');
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
      const spyFindRewards = jest.spyOn(rewardService, 'findRewards');

      expect(result).toStrictEqual(expected);
      expect(spyFindRewards).toBeCalledTimes(1);
    });

    it('return an array of GuardianDatas', () => {
      const result = rewardController.findRewards('guardian');
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
      const spyFindRewards = jest.spyOn(rewardService, 'findRewards');

      expect(result).toStrictEqual(expected);
      expect(spyFindRewards).toBeCalledTimes(1);
    });
  });

  describe('findRewardsByLevel()', () => {
    it('find an array of ChaosDatas by level', () => {
      const result = rewardController.findRewardsByLevel('chaos', 'level1');
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
      const spyFindRewardsByLevel = jest.spyOn(
        rewardService,
        'findRewardsByLevel',
      );

      expect(result).toStrictEqual(expected);
      expect(spyFindRewardsByLevel).toBeCalledTimes(1);
    });

    it('find an array of GuardianDatas by level', () => {
      const result = rewardController.findRewardsByLevel('guardian', 'level1');
      const expected = [
        {
          level: 'level1',
          count: 1,
          destruction: 1,
          protection: 1,
          leapStone: 1,
        },
      ];
      const spyFindRewardsByLevel = jest.spyOn(
        rewardService,
        'findRewardsByLevel',
      );

      expect(result).toStrictEqual(expected);
      expect(spyFindRewardsByLevel).toBeCalledTimes(1);
    });
  });

  describe('createRewardChaos()', () => {
    it('create new rewardChaos', () => {
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
      const result = rewardController.createRewardChaos(createRewardChaosDto);
      const spyCreateRewardChaos = jest.spyOn(
        rewardService,
        'createRewardChaos',
      );

      expect(result).toStrictEqual(createRewardChaosDto);
      expect(spyCreateRewardChaos).toBeCalledTimes(1);
    });
  });

  describe('createRewardGuardian()', () => {
    it('create new rewardGuardian', () => {
      const createRewardGuardianDto = {
        level: 'newLevel',
        count: 123,
        destruction: 123,
        protection: 123,
        leapStone: 123,
      };
      const result = rewardController.createRewardGuardian(
        createRewardGuardianDto,
      );
      const spyCreateRewardGuardian = jest.spyOn(
        rewardService,
        'createRewardGuardian',
      );

      expect(result).toStrictEqual(createRewardGuardianDto);
      expect(spyCreateRewardGuardian).toBeCalledTimes(1);
    });
  });
});
