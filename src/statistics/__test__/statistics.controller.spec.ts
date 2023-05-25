import { Test, TestingModule } from '@nestjs/testing';
import { StatisticsService } from '../statistics.service';
import { StatisticsController } from '../statistics.controller';
import { StatsChaosReward } from '../interfaces/stats-chaos-reward.interface';
import { StatsGuardianReward } from '../interfaces/stats-guardian-reward.interface';
import { StatsArmorySetting } from '../interfaces/stats-armory-setting.interface';
import { StatsSkillSetting } from '../interfaces/stats-skill-setting.interface';
import { CreateChaosRewardDto } from '../chaos-rewards/dto/create-chaos-reward.dto';
import { CreateGuardianRewardDto } from '../guardian-rewards/dto/create-guardian-reward.dto';
import { CreateArmorySettingDto } from '../armory-settings/dto/create-armory-setting.dto';
import { CreateSkillSettingDto } from '../skill-settings/dto/create-skill-setting.dto';

const mockStatsChaosReward: StatsChaosReward = {
  count: 0,
  level: 'level',
  itemCounts: {
    silling: 0,
    shard: 0,
    destructionStone: 0,
    protectionStone: 0,
    leapStone: 0,
    gem: 0,
  },
};
const mockCreateChaosRewardDto: CreateChaosRewardDto = {
  level: 'level',
  count: 0,
  silling: 0,
  shard: 0,
  destructionStone: 0,
  protectionStone: 0,
  leapStone: 0,
  gem: 0,
};
const mockStatsGuardianReward: StatsGuardianReward = {
  count: 0,
  level: 'level',
  itemCounts: {
    destructionStone: 0,
    protectionStone: 0,
    leapStone: 0,
  },
};
const mockCreateGuardianRewardDto: CreateGuardianRewardDto = {
  level: 'level',
  count: 0,
  destructionStone: 0,
  protectionStone: 0,
  leapStone: 0,
};
const mockStatsArmorySetting: StatsArmorySetting = {
  count: 0,
  classEngraveCode: {
    count: 0,
    abilities: {
      ability: 0,
    },
    engraves: [{ engrave1: 0 }, { engrave2: 0 }, { engrave3: 0 }],
    itemSets: {
      itemSet: 0,
    },
    elixirs: {
      elixir: 0,
    },
  },
};
const mockCreateArmorySettingDto: CreateArmorySettingDto = {
  characterName: 'characterName',
  className: 'className',
  itemLevel: 0,
  ability: 'ability',
  engraves: [
    {
      name: 'engraveName',
      level: 0,
    },
  ],
  classEngraves: [{ name: 'classEngraveName', level: 0 }],
  itemSet: 'itemSet',
  elixir: 'elixir',
};
const mockStatsSkillSetting: StatsSkillSetting = {
  count: 0,
  classEngrave: {
    count: 0,
    skillName: {
      count: 0,
      levels: {
        level: 0,
      },
      tripods: {
        tripod: 0,
      },
      runes: {
        runeName: 0,
      },
    },
  },
};
const mockCreateSkillSettingDto: CreateSkillSettingDto = {
  characterName: 'characterName',
  className: 'className',
  classEngraves: ['classEngrave'],
  skillUsages: [
    {
      skillName: 'skillName',
      skillLevel: 0,
      tripodNames: ['tripodName'],
      runeName: 'runeName',
    },
  ],
};

class MockStatisticsService {
  getStatsChaosReward = jest.fn().mockReturnValue(mockStatsChaosReward);
  createChaosReward = jest.fn().mockReturnValue(mockCreateChaosRewardDto);

  getStatsGuardianReward = jest.fn().mockReturnValue(mockStatsGuardianReward);
  createGuardianReward = jest.fn().mockReturnValue(mockCreateGuardianRewardDto);

  getStatsArmorySetting = jest.fn().mockReturnValue(mockStatsArmorySetting);
  createArmorySetting = jest.fn().mockReturnValue(mockCreateArmorySettingDto);

  getStatsSkillSetting = jest.fn().mockReturnValue(mockStatsSkillSetting);
  createSkillSetting = jest.fn().mockReturnValue(mockCreateSkillSettingDto);
}

describe('StatisticsController', () => {
  let statisticsController: StatisticsController;
  let statisticsService: StatisticsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StatisticsController],
      providers: [
        {
          provide: StatisticsService,
          useClass: MockStatisticsService,
        },
      ],
    }).compile();

    statisticsController =
      module.get<StatisticsController>(StatisticsController);
    statisticsService = module.get<StatisticsService>(StatisticsService);
  });

  describe('GET', () => {
    it('should return statsChaosReward', () => {
      const result = statisticsController.getStatsChaosReward('');
      expect(result).toStrictEqual(mockStatsChaosReward);
      expect(
        jest.spyOn(statisticsService, 'getStatsChaosReward'),
      ).toBeCalledTimes(1);
    });

    it('should return statsGuardianReward', () => {
      const result = statisticsController.getStatsGuardianReward('');
      expect(result).toStrictEqual(mockStatsGuardianReward);
      expect(
        jest.spyOn(statisticsService, 'getStatsGuardianReward'),
      ).toBeCalledTimes(1);
    });

    it('should return statsArmorySetting', () => {
      const result = statisticsController.getStatsArmorySetting('');
      expect(result).toStrictEqual(mockStatsArmorySetting);
      expect(
        jest.spyOn(statisticsService, 'getStatsArmorySetting'),
      ).toBeCalledTimes(1);
    });

    it('should return statsSkillSetting', () => {
      const result = statisticsController.getStatsSkillSetting('');
      expect(result).toStrictEqual(mockStatsSkillSetting);
      expect(
        jest.spyOn(statisticsService, 'getStatsSkillSetting'),
      ).toBeCalledTimes(1);
    });
  });

  describe('POST', () => {
    it('should return createChaosRewardDto', () => {
      const result = statisticsController.createChaosReward(
        mockCreateChaosRewardDto,
      );
      expect(result).toStrictEqual(mockCreateChaosRewardDto);
      expect(
        jest.spyOn(statisticsService, 'createChaosReward'),
      ).toBeCalledTimes(1);
    });

    it('should return createGuardianRewardDto', () => {
      const result = statisticsController.createGuardianReward(
        mockCreateGuardianRewardDto,
      );
      expect(result).toStrictEqual(mockCreateGuardianRewardDto);
      expect(
        jest.spyOn(statisticsService, 'createGuardianReward'),
      ).toBeCalledTimes(1);
    });

    it('should return createArmorySettingDto', () => {
      const result = statisticsController.createArmorySetting(
        mockCreateArmorySettingDto,
      );
      expect(result).toStrictEqual(mockCreateArmorySettingDto);
      expect(
        jest.spyOn(statisticsService, 'createArmorySetting'),
      ).toBeCalledTimes(1);
    });

    it('should return createSkillSettingDto', () => {
      const result = statisticsController.createSkillSetting(
        mockCreateSkillSettingDto,
      );
      expect(result).toStrictEqual(mockCreateSkillSettingDto);
      expect(
        jest.spyOn(statisticsService, 'createSkillSetting'),
      ).toBeCalledTimes(1);
    });
  });
});
