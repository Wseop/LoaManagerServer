import { EngraveService } from '../../resources/engrave/engrave.service';
import { ChaosRewardsService } from '../chaos-rewards/chaos-rewards.service';
import { GuardianRewardsService } from '../guardian-rewards/guardian-rewards.service';
import { SkillSettingsService } from '../skill-settings/skill-settings.service';
import { StatisticsService } from '../statistics.service';
import { Test, TestingModule } from '@nestjs/testing';

class MockChaosRewardsService {
  findChaosRewardsByLevel = jest.fn().mockResolvedValue([
    {
      level: 'level',
      count: 1,
      silling: 1,
      shard: 1,
      destructionStone: 1,
      protectionStone: 1,
      leapStone: 1,
      gem: 1,
    },
    {
      level: 'level',
      count: 1,
      silling: 1,
      shard: 1,
      destructionStone: 1,
      protectionStone: 1,
      leapStone: 1,
      gem: 1,
    },
    {
      level: 'level',
      count: 1,
      silling: 1,
      shard: 1,
      destructionStone: 1,
      protectionStone: 1,
      leapStone: 1,
      gem: 1,
    },
  ]);
  createChaosReward = jest.fn().mockResolvedValue({
    level: 'level',
    count: 1,
    silling: 1,
    shard: 1,
    destructionStone: 1,
    protectionStone: 1,
    leapStone: 1,
    gem: 1,
  });
}
class MockGuardianRewardsService {
  findGuardianRewardsByLevel = jest.fn().mockResolvedValue([
    {
      level: 'level',
      count: 1,
      destructionStone: 1,
      protectionStone: 1,
      leapStone: 1,
    },
    {
      level: 'level',
      count: 1,
      destructionStone: 1,
      protectionStone: 1,
      leapStone: 1,
    },
    {
      level: 'level',
      count: 1,
      destructionStone: 1,
      protectionStone: 1,
      leapStone: 1,
    },
  ]);
  createGuardianReward = jest.fn().mockResolvedValue({
    level: 'level',
    count: 1,
    destructionStone: 1,
    protectionStone: 1,
    leapStone: 1,
  });
}
class MockArmorySettingsService {
  findArmorySettingsByClassName = jest.fn().mockResolvedValue([
    {
      characterName: 'characterName',
      className: 'className',
      itemLevel: 0,
      ability: 'ability',
      engraves: [{ engraveName: 'engraveName1', engraveLevel: 1 }],
      classEngraves: [{ engraveName: 'classEngraveName1', engraveLevel: 1 }],
      itemSet: 'itemSet',
      elixir: 'elixir',
    },
    {
      characterName: 'characterName',
      className: 'className',
      itemLevel: 0,
      ability: 'ability',
      engraves: [{ engraveName: 'engraveName1', engraveLevel: 1 }],
      classEngraves: [{ engraveName: 'classEngraveName1', engraveLevel: 1 }],
      itemSet: 'itemSet',
      elixir: 'elixir',
    },
    {
      characterName: 'characterName',
      className: 'className',
      itemLevel: 0,
      ability: 'ability',
      engraves: [{ engraveName: 'engraveName1', engraveLevel: 1 }],
      classEngraves: [{ engraveName: 'classEngraveName1', engraveLevel: 1 }],
      itemSet: 'itemSet',
      elixir: 'elixir',
    },
  ]);
}
class MockSkillSettingsService {
  findSkillSettingsByClassName = jest.fn().mockResolvedValue([
    {
      characterName: 'characterName',
      className: 'className',
      classEngraves: ['classEngraveName1'],
      skillUsages: [
        {
          skillName: 'skillName',
          skillLevel: 0,
          tripodNames: ['tripod1', 'tripod2'],
          runeName: 'runeName',
        },
      ],
    },
    {
      characterName: 'characterName',
      className: 'className',
      classEngraves: ['classEngraveName1'],
      skillUsages: [
        {
          skillName: 'skillName',
          skillLevel: 0,
          tripodNames: ['tripod1', 'tripod2'],
          runeName: 'runeName',
        },
      ],
    },
    {
      characterName: 'characterName',
      className: 'className',
      classEngraves: ['classEngraveName1'],
      skillUsages: [
        {
          skillName: 'skillName',
          skillLevel: 0,
          tripodNames: ['tripod1', 'tripod2'],
          runeName: 'runeName',
        },
      ],
    },
  ]);
}
class MockEngraveService {
  findClassEngraveNames = jest.fn((className) => {
    if (className === 'className') {
      return ['classEngraveName1', 'classEngraveName2'];
    } else {
      return [];
    }
  });
}

describe('StatisticsService', () => {
  let statisticsService: StatisticsService;
  let chaosRewardsService: ChaosRewardsService;
  let guardianRewardsService: GuardianRewardsService;
  let skillSettingsService: SkillSettingsService;
  let engraveService: EngraveService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StatisticsService,
        {
          provide: ChaosRewardsService,
          useClass: MockChaosRewardsService,
        },
        {
          provide: GuardianRewardsService,
          useClass: MockGuardianRewardsService,
        },
        {
          provide: SkillSettingsService,
          useClass: MockSkillSettingsService,
        },
        {
          provide: EngraveService,
          useClass: MockEngraveService,
        },
      ],
    }).compile();

    statisticsService = module.get<StatisticsService>(StatisticsService);
    chaosRewardsService = module.get<ChaosRewardsService>(ChaosRewardsService);
    guardianRewardsService = module.get<GuardianRewardsService>(
      GuardianRewardsService,
    );
    skillSettingsService =
      module.get<SkillSettingsService>(SkillSettingsService);
    engraveService = module.get<EngraveService>(EngraveService);
  });

  describe('getStatisticsChaos', () => {
    it('should return StatisticsChaos', async () => {
      const result = await statisticsService.getStatisticsChaos('level');
      expect(result).toStrictEqual({
        count: 3,
        level: 'level',
        itemCounts: {
          silling: 3,
          shard: 3,
          destructionStone: 3,
          protectionStone: 3,
          leapStone: 3,
          gem: 3,
        },
      });
      expect(
        jest.spyOn(chaosRewardsService, 'findChaosRewardsByLevel'),
      ).toBeCalledTimes(1);
    });
  });

  describe('createChaosReward', () => {
    it('should return CreateChaosRewardDto', async () => {
      const result = await statisticsService.createChaosReward({
        level: 'level',
        count: 1,
        silling: 1,
        shard: 1,
        destructionStone: 1,
        protectionStone: 1,
        leapStone: 1,
        gem: 1,
      });
      expect(result).toStrictEqual({
        level: 'level',
        count: 1,
        silling: 1,
        shard: 1,
        destructionStone: 1,
        protectionStone: 1,
        leapStone: 1,
        gem: 1,
      });
      expect(
        jest.spyOn(chaosRewardsService, 'createChaosReward'),
      ).toBeCalledTimes(1);
    });
  });

  describe('getStatisticsGuardian', () => {
    it('should return StatisticsGuardian', async () => {
      const result = await statisticsService.getStatisticsGuardian('level');
      expect(result).toStrictEqual({
        count: 3,
        level: 'level',
        itemCounts: {
          destructionStone: 3,
          protectionStone: 3,
          leapStone: 3,
        },
      });
      expect(
        jest.spyOn(guardianRewardsService, 'findGuardianRewardsByLevel'),
      ).toBeCalledTimes(1);
    });
  });

  describe('createGuardianReward', () => {
    it('should return CreateGuardianRewardDto', async () => {
      const result = await statisticsService.createGuardianReward({
        level: 'level',
        count: 1,
        destructionStone: 1,
        protectionStone: 1,
        leapStone: 1,
      });
      expect(result).toStrictEqual({
        level: 'level',
        count: 1,
        destructionStone: 1,
        protectionStone: 1,
        leapStone: 1,
      });
      expect(
        jest.spyOn(guardianRewardsService, 'createGuardianReward'),
      ).toBeCalledTimes(1);
    });
  });

  describe('getStatisticsSkill', () => {
    it('should return StatisticsSkill', async () => {
      const result = await statisticsService.getStatisticsSkill('className');
      expect(result).toStrictEqual({
        count: 3,
        classEngraveName1: {
          count: 3,
          skillName: {
            count: 3,
            levels: {
              '0': 3,
            },
            tripods: {
              tripod1: 3,
              tripod2: 3,
            },
            runes: {
              runeName: 3,
            },
          },
        },
        classEngraveName2: {
          count: 0,
        },
        쌍직각: {
          count: 0,
        },
      });
      expect(
        jest.spyOn(engraveService, 'findClassEngraveNames'),
      ).toBeCalledTimes(1);
      expect(
        jest.spyOn(skillSettingsService, 'findSkillSettingsByClassName'),
      ).toBeCalledTimes(1);
    });

    it('should return null', async () => {
      const result = await statisticsService.getStatisticsSkill('null');
      expect(result).toBe(null);
    });
  });
});
