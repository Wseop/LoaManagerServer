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
class MockAbilitySettingsService {
  findAbilitySettings = jest.fn((className) => {
    if (className) {
      return [
        {
          characterName: '쿠키바닐라밀크쉐이크',
          ability: '특신',
          classEngrave: '광전사의 비기',
          className: '버서커',
        },
        {
          characterName: '김쫑마',
          ability: '치신',
          classEngrave: '광기',
          className: '버서커',
        },
        {
          characterName: '눈만땡글',
          ability: '치신',
          classEngrave: '광기',
          className: '버서커',
        },
      ];
    } else {
      return [
        {
          characterName: '쿠키바닐라쉐이크',
          ability: '신특',
          classEngrave: '축복의 오라',
          className: '홀리나이트',
        },
        {
          characterName: '쿠키바닐라밀크쉐이크',
          ability: '특신',
          classEngrave: '광전사의 비기',
          className: '버서커',
        },
        {
          characterName: '노돌리',
          ability: '특신',
          classEngrave: '오의 강화',
          className: '배틀마스터',
        },
      ];
    }
  });
}
class MockElixirSettingsService {
  findElixirSettings = jest.fn((className) => {
    if (className) {
      return [
        {
          characterName: '김쫑마',
          classEngrave: '광기',
          className: '버서커',
          elixir: '회심',
        },
        {
          characterName: '눈만땡글',
          classEngrave: '광기',
          className: '버서커',
          elixir: '회심',
        },
        {
          characterName: '빈세로이',
          classEngrave: '광기',
          className: '버서커',
          elixir: '회심',
        },
      ];
    } else {
      return [
        {
          characterName: '쿠키바닐라쉐이크',
          classEngrave: '축복의 오라',
          className: '홀리나이트',
          elixir: '선각자',
        },
        {
          characterName: '노돌리',
          classEngrave: '오의 강화',
          className: '배틀마스터',
          elixir: '달인',
        },
        {
          characterName: '꽃비엘라',
          classEngrave: '이슬비',
          className: '기상술사',
          elixir: '회심',
        },
      ];
    }
  });
}
class MockEngraveSettingsService {
  findEngraveSettings = jest.fn((className) => {
    if (className) {
      return [
        {
          characterName: '쿠키바닐라밀크쉐이크',
          classEngrave: '광전사의 비기',
          className: '버서커',
          engraves: [
            {
              engraveName: '돌격대장',
              engraveLevel: 3,
            },
            {
              engraveName: '원한',
              engraveLevel: 3,
            },
            {
              engraveName: '예리한 둔기',
              engraveLevel: 3,
            },
            {
              engraveName: '광전사의 비기',
              engraveLevel: 3,
            },
            {
              engraveName: '기습의 대가',
              engraveLevel: 3,
            },
            {
              engraveName: '에테르 포식자',
              engraveLevel: 1,
            },
          ],
        },
        {
          characterName: '김쫑마',
          classEngrave: '광기',
          className: '버서커',
          engraves: [
            {
              engraveName: '원한',
              engraveLevel: 3,
            },
            {
              engraveName: '광기',
              engraveLevel: 3,
            },
            {
              engraveName: '예리한 둔기',
              engraveLevel: 3,
            },
            {
              engraveName: '달인의 저력',
              engraveLevel: 3,
            },
            {
              engraveName: '돌격대장',
              engraveLevel: 3,
            },
            {
              engraveName: '저주받은 인형',
              engraveLevel: 2,
            },
          ],
        },
        {
          characterName: '눈만땡글',
          classEngrave: '광기',
          className: '버서커',
          engraves: [
            {
              engraveName: '원한',
              engraveLevel: 3,
            },
            {
              engraveName: '예리한 둔기',
              engraveLevel: 3,
            },
            {
              engraveName: '달인의 저력',
              engraveLevel: 3,
            },
            {
              engraveName: '저주받은 인형',
              engraveLevel: 3,
            },
            {
              engraveName: '돌격대장',
              engraveLevel: 3,
            },
            {
              engraveName: '광기',
              engraveLevel: 1,
            },
          ],
        },
      ];
    } else {
      return [
        {
          characterName: '쿠키바닐라밀크쉐이크',
          classEngrave: '광전사의 비기',
          className: '버서커',
          engraves: [
            {
              engraveName: '돌격대장',
              engraveLevel: 3,
            },
            {
              engraveName: '원한',
              engraveLevel: 3,
            },
            {
              engraveName: '예리한 둔기',
              engraveLevel: 3,
            },
            {
              engraveName: '광전사의 비기',
              engraveLevel: 3,
            },
            {
              engraveName: '기습의 대가',
              engraveLevel: 3,
            },
            {
              engraveName: '에테르 포식자',
              engraveLevel: 1,
            },
          ],
        },
        {
          characterName: '쿠키바닐라쉐이크',
          classEngrave: '축복의 오라',
          className: '홀리나이트',
          engraves: [
            {
              engraveName: '축복의 오라',
              engraveLevel: 3,
            },
            {
              engraveName: '구슬동자',
              engraveLevel: 3,
            },
            {
              engraveName: '급소 타격',
              engraveLevel: 3,
            },
            {
              engraveName: '각성',
              engraveLevel: 3,
            },
            {
              engraveName: '전문의',
              engraveLevel: 3,
            },
            {
              engraveName: '심판자',
              engraveLevel: 1,
            },
          ],
        },
        {
          characterName: '노돌리',
          classEngrave: '오의 강화',
          className: '배틀마스터',
          engraves: [
            {
              engraveName: '원한',
              engraveLevel: 3,
            },
            {
              engraveName: '오의 강화',
              engraveLevel: 3,
            },
            {
              engraveName: '예리한 둔기',
              engraveLevel: 3,
            },
            {
              engraveName: '저주받은 인형',
              engraveLevel: 3,
            },
            {
              engraveName: '돌격대장',
              engraveLevel: 3,
            },
            {
              engraveName: '아드레날린',
              engraveLevel: 2,
            },
          ],
        },
      ];
    }
  });
}
class MockProfilesService {}
class MockSetSettingsService {
  findSetSettings = jest.fn((className) => {
    if (className) {
      return [
        {
          characterName: '쿠키바닐라밀크쉐이크',
          classEngrave: '광전사의 비기',
          className: '버서커',
          set: '6사멸',
        },
        {
          characterName: '김쫑마',
          classEngrave: '광기',
          className: '버서커',
          set: '6악몽',
        },
        {
          characterName: '눈만땡글',
          classEngrave: '광기',
          className: '버서커',
          set: '6악몽',
        },
      ];
    } else {
      return [
        {
          characterName: '쿠키바닐라쉐이크',
          classEngrave: '축복의 오라',
          className: '홀리나이트',
          set: '6갈망',
        },
        {
          characterName: '노돌리',
          classEngrave: '오의 강화',
          className: '배틀마스터',
          set: '6환각',
        },
        {
          characterName: '쿠키바닐라밀크쉐이크',
          classEngrave: '광전사의 비기',
          className: '버서커',
          set: '6사멸',
        },
      ];
    }
  });
}
class MockEngraveService {
  findClassEngraveNames = jest.fn((className) => {
    if (className === 'className') {
      return ['classEngraveName1', 'classEngraveName2'];
    } else if (className === '버서커') {
      return ['광기', '광전사의 비기'];
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
          useClass: MockEngraveSettingsService,
        },
        {
          provide: ProfilesService,
          useClass: MockProfilesService,
        },
        {
          provide: SetSettingsService,
          useClass: MockSetSettingsService,
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
    abilitySettingsService = module.get<AbilitySettingsService>(
      AbilitySettingsService,
    );
    elixirSettingsService = module.get<ElixirSettingsService>(
      ElixirSettingsService,
    );
    engraveSettingsService = module.get<EngraveSettingsService>(
      EngraveSettingsService,
    );
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
              '3': 1,
            },
            tripods: {
              tripod1: 1,
              tripod2: 1,
            },
            runes: {
              null: 1,
            },
          },
        },
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

  describe('Ability', () => {
    it('should return AbilityCount', async () => {
      const result = await statisticsService.getStatisticsAbility(null);
      expect(result).toStrictEqual({
        count: 3,
        신특: 1,
        특신: 2,
      });
      expect(
        jest.spyOn(engraveService, 'findClassEngraveNames'),
      ).toBeCalledTimes(0);
      expect(
        jest.spyOn(abilitySettingsService, 'findAbilitySettings'),
      ).toBeCalledTimes(1);
    });

    it('should return AbilityCount classified by classEngrave', async () => {
      const result = await statisticsService.getStatisticsAbility('버서커');
      expect(result).toStrictEqual({
        count: 3,
        광기: {
          count: 2,
          치신: 2,
        },
        '광전사의 비기': {
          count: 1,
          특신: 1,
        },
      });
      expect(
        jest.spyOn(engraveService, 'findClassEngraveNames'),
      ).toBeCalledTimes(1);
      expect(
        jest.spyOn(abilitySettingsService, 'findAbilitySettings'),
      ).toBeCalledTimes(1);
    });
  });

  describe('Elixir', () => {
    it('should return ElixirCount', async () => {
      const result = await statisticsService.getStatisticsElixir(null);
      expect(result).toStrictEqual({
        count: 3,
        선각자: 1,
        달인: 1,
        회심: 1,
      });
      expect(
        jest.spyOn(engraveService, 'findClassEngraveNames'),
      ).toBeCalledTimes(0);
      expect(
        jest.spyOn(elixirSettingsService, 'findElixirSettings'),
      ).toBeCalledTimes(1);
    });

    it('should return ElixirCount classified by classEngrave', async () => {
      const result = await statisticsService.getStatisticsElixir('버서커');
      expect(result).toStrictEqual({
        count: 3,
        광기: {
          count: 3,
          회심: 3,
        },
        '광전사의 비기': {
          count: 0,
        },
      });
      expect(
        jest.spyOn(engraveService, 'findClassEngraveNames'),
      ).toBeCalledTimes(1);
      expect(
        jest.spyOn(elixirSettingsService, 'findElixirSettings'),
      ).toBeCalledTimes(1);
    });
  });

  describe('Engrave', () => {
    it('should return EngraveCount', async () => {
      const result = await statisticsService.getStatisticsEngrave(null);
      expect(result).toStrictEqual([
        {
          count: 3,
          '에테르 포식자': 1,
          심판자: 1,
        },
        {
          count: 3,
          아드레날린: 1,
        },
        {
          count: 3,
          돌격대장: 2,
          원한: 2,
          '예리한 둔기': 2,
          '광전사의 비기': 1,
          '기습의 대가': 1,
          '축복의 오라': 1,
          구슬동자: 1,
          '급소 타격': 1,
          각성: 1,
          전문의: 1,
          '오의 강화': 1,
          '저주받은 인형': 1,
        },
      ]);
      expect(
        jest.spyOn(engraveService, 'findClassEngraveNames'),
      ).toBeCalledTimes(0);
      expect(
        jest.spyOn(engraveSettingsService, 'findEngraveSettings'),
      ).toBeCalledTimes(1);
    });

    it('should return Engravecount classified by classEngrave', async () => {
      const result = await statisticsService.getStatisticsEngrave('버서커');
      expect(result).toStrictEqual([
        {
          count: 3,
          광기: {
            count: 2,
            광기: 1,
          },
          '광전사의 비기': {
            count: 1,
            '에테르 포식자': 1,
          },
        },
        {
          count: 3,
          광기: {
            count: 2,
            '저주받은 인형': 1,
          },
          '광전사의 비기': {
            count: 1,
          },
        },
        {
          count: 3,
          광기: {
            count: 2,
            원한: 2,
            광기: 1,
            '예리한 둔기': 2,
            '달인의 저력': 2,
            돌격대장: 2,
            '저주받은 인형': 1,
          },
          '광전사의 비기': {
            count: 1,
            돌격대장: 1,
            원한: 1,
            '예리한 둔기': 1,
            '광전사의 비기': 1,
            '기습의 대가': 1,
          },
        },
      ]);
      expect(
        jest.spyOn(engraveService, 'findClassEngraveNames'),
      ).toBeCalledTimes(1);
      expect(
        jest.spyOn(engraveSettingsService, 'findEngraveSettings'),
      ).toBeCalledTimes(1);
    });
  });

  describe('Set', () => {
    it('should return SetCount', async () => {
      const result = await statisticsService.getStatisticsSet(null);
      expect(result).toStrictEqual({
        count: 3,
        '6갈망': 1,
        '6환각': 1,
        '6사멸': 1,
      });
      expect(
        jest.spyOn(engraveService, 'findClassEngraveNames'),
      ).toBeCalledTimes(0);
      expect(jest.spyOn(setSettingsService, 'findSetSettings')).toBeCalledTimes(
        1,
      );
    });

    it('should return SetCount classified by classEngrave', async () => {
      const result = await statisticsService.getStatisticsSet('버서커');
      expect(result).toStrictEqual({
        count: 3,
        광기: {
          count: 2,
          '6악몽': 2,
        },
        '광전사의 비기': {
          count: 1,
          '6사멸': 1,
        },
      });
      expect(
        jest.spyOn(engraveService, 'findClassEngraveNames'),
      ).toBeCalledTimes(1);
      expect(jest.spyOn(setSettingsService, 'findSetSettings')).toBeCalledTimes(
        1,
      );
    });
  });
});
