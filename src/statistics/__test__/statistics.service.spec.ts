import { EngraveService } from '../../resources/engrave/engrave.service';
import { AbilitySettingsService } from '../ability-settings/ability-settings.service';
import { ChaosRewardsService } from '../chaos-rewards/chaos-rewards.service';
import { ElixirSettingsService } from '../elixir-settings/elixir-settings.service';
import { EngraveSettingsService } from '../engrave-settings/engrave-settings.service';
import { GuardianRewardsService } from '../guardian-rewards/guardian-rewards.service';
import { ProfilesService } from '../profiles/profiles.service';
import { SetSettingsService } from '../set-settings/set-settings.service';
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
class MockSkillSettingsService {
  findSkillSettings = jest.fn().mockResolvedValue([
    {
      characterName: 'characterName1',
      className: 'className',
      classEngrave: 'classEngraveName1',
      skillUsages: [
        {
          skillName: 'skillName',
          skillLevel: 1,
          tripodNames: ['tripod1', 'tripod2'],
          runeName: 'runeName',
        },
      ],
    },
    {
      characterName: 'characterName2',
      className: 'className',
      classEngrave: 'classEngraveName1',
      skillUsages: [
        {
          skillName: 'skillName',
          skillLevel: 2,
          tripodNames: [],
          runeName: 'runeName',
        },
      ],
    },
    {
      characterName: 'characterName3',
      className: 'className',
      classEngrave: 'classEngraveName2',
      skillUsages: [
        {
          skillName: 'skillName',
          skillLevel: 3,
          tripodNames: ['tripod1', 'tripod2'],
          runeName: null,
        },
      ],
    },
  ]);
}
class MockAbilitySettingsService { }
class MockElixirSettingsService { }
class MockEngraveSettingsService { }
class MockProfilesService { }
class MockSetSettingsService { }
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
  let abilitySettingsService: AbilitySettingsService;
  let elixirSettingsService: ElixirSettingsService;
  let engraveSettingsService: EngraveSettingsService;
  let profilesService: ProfilesService;
  let setSettingsService: SetSettingsService;
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
          provide: AbilitySettingsService,
          useClass: MockAbilitySettingsService,
        },
        {
          provide: ElixirSettingsService,
          useClass: MockElixirSettingsService,
        },
        {
          provide: EngraveSettingsService,
          useClass: MockEngraveSettingsService
        },
        {
          provide: ProfilesService,
          useClass: MockProfilesService,
        },
        {
          provide: SetSettingsService,
          useClass: MockSetSettingsService
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
    abilitySettingsService = module.get<AbilitySettingsService>(AbilitySettingsService);
    elixirSettingsService = module.get<ElixirSettingsService>(ElixirSettingsService);
    engraveSettingsService = module.get<EngraveSettingsService>(EngraveSettingsService);
    profilesService = module.get<ProfilesService>(ProfilesService);
    setSettingsService = module.get<SetSettingsService>(SetSettingsService);
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
          count: 2,
          skillName: {
            count: 2,
            levels: {
              '1': 1,
              '2': 1,
            },
            tripods: {
              tripod1: 1,
              tripod2: 1,
            },
            runes: {
              runeName: 2,
            },
          },
        },
        classEngraveName2: {
          count: 1,
          skillName: {
            count: 1,
            levels: {
              '3': 1
            },
            tripods: {
              tripod1: 1,
              tripod2: 1,
            },
            runes: {
              'null': 1,
            },
          },
        }
      });
      expect(
        jest.spyOn(engraveService, 'findClassEngraveNames'),
      ).toBeCalledTimes(1);
      expect(
        jest.spyOn(skillSettingsService, 'findSkillSettings'),
      ).toBeCalledTimes(1);
    });

    it('should return null', async () => {
      const result = await statisticsService.getStatisticsSkill('null');
      expect(result).toBe(null);
    });
  });
});
