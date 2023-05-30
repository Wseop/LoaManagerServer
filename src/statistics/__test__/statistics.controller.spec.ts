import { Test, TestingModule } from '@nestjs/testing';
import { StatisticsService } from '../statistics.service';
import { StatisticsController } from '../statistics.controller';
import { StatsChaosReward } from '../dto/stats-chaos-reward.dto';
import { StatsGuardianReward } from '../dto/stats-guardian-reward.dto';
import { StatsArmorySetting } from '../dto/stats-armory-setting.dto';
import { StatsSkillSetting } from '../dto/stats-skill-setting.dto';
import { CreateChaosRewardDto } from '../chaos-rewards/dto/create-chaos-reward.dto';
import { CreateGuardianRewardDto } from '../guardian-rewards/dto/create-guardian-reward.dto';

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

class MockStatisticsService {
  getStatsChaosReward = jest.fn().mockReturnValue(mockStatsChaosReward);
  createChaosReward = jest.fn().mockReturnValue(mockCreateChaosRewardDto);

  getStatsGuardianReward = jest.fn().mockReturnValue(mockStatsGuardianReward);
  createGuardianReward = jest.fn().mockReturnValue(mockCreateGuardianRewardDto);

  getStatsArmorySetting = jest.fn().mockReturnValue(mockStatsArmorySetting);

  getStatsSkillSetting = jest.fn().mockReturnValue(mockStatsSkillSetting);
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
  });
});
