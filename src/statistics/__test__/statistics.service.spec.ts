import { EngraveService } from '../../resources/engrave/engrave.service';
import { ArmorySettingsService } from '../armory-settings/armory-settings.service';
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
      engraves: [{ name: 'engraveName1', level: 1 }],
      classEngraves: [{ name: 'classEngraveName1', level: 1 }],
      itemSet: 'itemSet',
      elixir: 'elixir',
    },
    {
      characterName: 'characterName',
      className: 'className',
      itemLevel: 0,
      ability: 'ability',
      engraves: [{ name: 'engraveName1', level: 1 }],
      classEngraves: [{ name: 'classEngraveName1', level: 1 }],
      itemSet: 'itemSet',
      elixir: 'elixir',
    },
    {
      characterName: 'characterName',
      className: 'className',
      itemLevel: 0,
      ability: 'ability',
      engraves: [{ name: 'engraveName1', level: 1 }],
      classEngraves: [{ name: 'classEngraveName1', level: 1 }],
      itemSet: 'itemSet',
      elixir: 'elixir',
    },
  ]);
  createArmorySetting = jest.fn().mockResolvedValue({
    characterName: 'characterName',
    className: 'className',
    itemLevel: 0,
    ability: 'ability',
    engraves: [{ name: 'engraveName1', level: 0 }],
    classEngraves: [{ name: 'classEngraveName1', level: 0 }],
    itemSet: 'itemSet',
    elixir: 'elixir',
  });
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
  createSkillSetting = jest.fn().mockResolvedValue({
    characterName: 'characterName',
    className: 'className',
    classEngraves: ['classEngraveName1', 'classEngraveName2'],
    skillUsages: [
      {
        skillName: 'skillName',
        skillLevel: 0,
        tripodNames: ['tripod1', 'tripod2'],
        runeName: 'runeName',
      },
    ],
  });
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
  let armorySettingsService: ArmorySettingsService;
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
          provide: ArmorySettingsService,
          useClass: MockArmorySettingsService,
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
    armorySettingsService = module.get<ArmorySettingsService>(
      ArmorySettingsService,
    );
    skillSettingsService =
      module.get<SkillSettingsService>(SkillSettingsService);
    engraveService = module.get<EngraveService>(EngraveService);
  });

  describe('getStatsChaosReward', () => {
    it('should return StatsChaosReward', async () => {
      const result = await statisticsService.getStatsChaosReward('level');
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

  describe('getStatsGuardianReward', () => {
    it('should return StatsGuardianReward', async () => {
      const result = await statisticsService.getStatsGuardianReward('level');
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

  describe('getStatsArmorySetting', () => {
    it('should return StatsArmorySetting', async () => {
      const result = await statisticsService.getStatsArmorySetting('className');
      expect(result).toStrictEqual({
        classEngraveName1: {
          count: 3,
          abilities: {
            ability: 3,
          },
          engraves: [
            {
              classEngraveName1: 3,
              engraveName1: 3,
            },
            {},
            {},
          ],
          itemSets: {
            itemSet: 3,
          },
          elixirs: {
            elixir: 3,
          },
        },
        classEngraveName2: {
          count: 0,
          abilities: {},
          engraves: [{}, {}, {}],
          itemSets: {},
          elixirs: {},
        },
        count: 3,
        pair: {
          count: 0,
          abilities: {},
          engraves: [{}, {}, {}],
          itemSets: {},
          elixirs: {},
        },
      });
      expect(
        jest.spyOn(engraveService, 'findClassEngraveNames'),
      ).toBeCalledTimes(1);
      expect(
        jest.spyOn(armorySettingsService, 'findArmorySettingsByClassName'),
      ).toBeCalledTimes(1);
    });

    it('should return null', async () => {
      const result = await statisticsService.getStatsArmorySetting('null');
      expect(result).toBe(null);
    });
  });

  describe('createArmorySetting', () => {
    it('should return CreateArmorysettingDto', async () => {
      const result = await statisticsService.createArmorySetting({
        characterName: 'characterName',
        className: 'className',
        itemLevel: 0,
        ability: 'ability',
        engraves: [{ name: 'engraveName1', level: 0 }],
        classEngraves: [{ name: 'classEngraveName1', level: 0 }],
        itemSet: 'itemSet',
        elixir: 'elixir',
      });
      expect(result).toStrictEqual({
        characterName: 'characterName',
        className: 'className',
        itemLevel: 0,
        ability: 'ability',
        engraves: [{ name: 'engraveName1', level: 0 }],
        classEngraves: [{ name: 'classEngraveName1', level: 0 }],
        itemSet: 'itemSet',
        elixir: 'elixir',
      });
      expect(
        jest.spyOn(armorySettingsService, 'createArmorySetting'),
      ).toBeCalledTimes(1);
    });
  });

  describe('getStatsSkillSetting', () => {
    it('should return StatsSkillSetting', async () => {
      const result = await statisticsService.getStatsSkillSetting('className');
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
        pair: {
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
      const result = await statisticsService.getStatsSkillSetting('null');
      expect(result).toBe(null);
    });
  });

  describe('createSkillSetting', () => {
    it('should return CreateSkillSettingDto', async () => {
      const result = await statisticsService.createSkillSetting({
        characterName: 'characterName',
        className: 'className',
        classEngraves: ['classEngraveName1', 'classEngraveName2'],
        skillUsages: [
          {
            skillName: 'skillName',
            skillLevel: 0,
            tripodNames: ['tripod1', 'tripod2'],
            runeName: 'runeName',
          },
        ],
      });
      expect(result).toStrictEqual({
        characterName: 'characterName',
        className: 'className',
        classEngraves: ['classEngraveName1', 'classEngraveName2'],
        skillUsages: [
          {
            skillName: 'skillName',
            skillLevel: 0,
            tripodNames: ['tripod1', 'tripod2'],
            runeName: 'runeName',
          },
        ],
      });
      expect(
        jest.spyOn(skillSettingsService, 'createSkillSetting'),
      ).toBeCalledTimes(1);
    });
  });
});
