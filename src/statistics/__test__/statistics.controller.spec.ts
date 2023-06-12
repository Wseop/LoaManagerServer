import { Test, TestingModule } from '@nestjs/testing';
import { StatisticsService } from '../statistics.service';
import { StatisticsController } from '../statistics.controller';
import { StatisticsChaos } from '../dto/statistics-chaos.dto';
import { StatisticsGuardian } from '../dto/statistics-guardian.dto';
import { StatisticsSkill } from '../dto/statistics-skill.dto';
import { CreateChaosRewardDto } from '../chaos-rewards/dto/create-chaos-reward.dto';
import { CreateGuardianRewardDto } from '../guardian-rewards/dto/create-guardian-reward.dto';

const mockStatisticsChaos: StatisticsChaos = {
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
const mockStatisticsGuardian: StatisticsGuardian = {
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
const mockStatisticsSkill: StatisticsSkill = {
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
  getStatisticsChaos = jest.fn().mockReturnValue(mockStatisticsChaos);
  createChaosReward = jest.fn().mockReturnValue(mockCreateChaosRewardDto);

  getStatisticsGuardian = jest.fn().mockReturnValue(mockStatisticsGuardian);
  createGuardianReward = jest.fn().mockReturnValue(mockCreateGuardianRewardDto);

  getStatisticsSkill = jest.fn().mockReturnValue(mockStatisticsSkill);
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
    it('should return statisticsChaos', () => {
      const result = statisticsController.getStatisticsChaos('');
      expect(result).toStrictEqual(mockStatisticsChaos);
      expect(
        jest.spyOn(statisticsService, 'getStatisticsChaos'),
      ).toBeCalledTimes(1);
    });

    it('should return statisticsGuardian', () => {
      const result = statisticsController.getStatisticsGuardian('');
      expect(result).toStrictEqual(mockStatisticsGuardian);
      expect(
        jest.spyOn(statisticsService, 'getStatisticsGuardian'),
      ).toBeCalledTimes(1);
    });

    it('should return statisticsSkill', () => {
      const result = statisticsController.getStatisticsSkill('');
      expect(result).toStrictEqual(mockStatisticsSkill);
      expect(
        jest.spyOn(statisticsService, 'getStatisticsSkill'),
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
