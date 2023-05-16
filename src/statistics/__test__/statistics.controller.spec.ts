import { Test, TestingModule } from '@nestjs/testing';
import { StatisticsController } from '../statistics.controller';
import { StatisticsService } from '../statistics.service';
import { StatsChaos } from '../schemas/stats-chaos.schema';
import { StatsGuardian } from '../schemas/stats-guardian.schema';
import { StatsSetting } from '../schemas/stats-setting.schema';
import { StatsSkill } from '../schemas/stats-skill.schema';
import { BadRequestException } from '@nestjs/common';

const mockStatsChaos: StatsChaos = {
  level: 'level',
  count: 0,
  silling: 0,
  shard: 0,
  destruction: 0,
  protection: 0,
  leapStone: 0,
  gem: 0,
};
const mockStatsGuardian: StatsGuardian = {
  level: 'level',
  count: 0,
  destruction: 0,
  protection: 0,
  leapStone: 0,
};
const mockStatsSetting: StatsSetting = {
  characterName: 'characterName',
  className: 'className',
  itemLevel: 0,
  ability: 'ability',
  elixir: 'elixir',
  engrave: 'engrave',
  engraveLevel: 'engraveLevel',
  itemSet: 'itemSet',
};
const mockStatsSkill: StatsSkill = {
  characterName: 'characterName',
  className: 'className',
  classEngraves: ['engrave', 'engrave'],
  skills: [
    {
      skillName: 'skillName',
      tripodNames: ['tripodName'],
      runeName: 'runeName',
    },
  ],
};

class MockStatisticsService {
  findStatsByLevel = jest.fn((category, filter) => {
    if (category === 'chaos') {
      return mockStatsChaos;
    } else if (category === 'guardian') {
      return mockStatsGuardian;
    }
  });
  findStatsByClass = jest.fn((category, filter) => {
    if (category === 'setting') {
      return mockStatsSetting;
    } else if (category === 'skill') {
      return mockStatsSkill;
    }
  });
  createStats = jest.fn((category, dto) => dto);
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

  describe('findStats()', () => {
    it('should return a mockChaos', () => {
      const result = statisticsController.findStats('chaos', 'filter');

      expect(result).toStrictEqual(mockStatsChaos);
      expect(jest.spyOn(statisticsService, 'findStatsByLevel')).toBeCalledTimes(
        1,
      );
    });
    it('should return a mockGuardian', () => {
      const result = statisticsController.findStats('guardian', 'filter');

      expect(result).toStrictEqual(mockStatsGuardian);
      expect(jest.spyOn(statisticsService, 'findStatsByLevel')).toBeCalledTimes(
        1,
      );
    });
    it('should return a mockSetting', () => {
      const result = statisticsController.findStats('setting', 'filter');

      expect(result).toStrictEqual(mockStatsSetting);
      expect(jest.spyOn(statisticsService, 'findStatsByClass')).toBeCalledTimes(
        1,
      );
    });
    it('should return a mockSkill', () => {
      const result = statisticsController.findStats('skill', 'filter');

      expect(result).toStrictEqual(mockStatsSkill);
      expect(jest.spyOn(statisticsService, 'findStatsByClass')).toBeCalledTimes(
        1,
      );
    });
    it('should throw BadRequestException', () => {
      try {
        statisticsController.findStats('invalid category', 'filter');
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
      } finally {
        expect(
          jest.spyOn(statisticsService, 'findStatsByLevel'),
        ).toBeCalledTimes(0);
        expect(
          jest.spyOn(statisticsService, 'findStatsByClass'),
        ).toBeCalledTimes(0);
      }
    });
  });

  describe('createChaosStats()', () => {
    it('should return a mockChaos', () => {
      const result = statisticsController.createChaosStats(mockStatsChaos);

      expect(result).toStrictEqual(mockStatsChaos);
      expect(jest.spyOn(statisticsService, 'createStats')).toBeCalledTimes(1);
    });
  });

  describe('createGuardianStats()', () => {
    it('should return a mockGuardian', () => {
      const result =
        statisticsController.createGuardianStats(mockStatsGuardian);

      expect(result).toStrictEqual(mockStatsGuardian);
      expect(jest.spyOn(statisticsService, 'createStats')).toBeCalledTimes(1);
    });
  });

  describe('createSettingStats()', () => {
    it('should return a mockSetting', () => {
      const result = statisticsController.createSettingStats(mockStatsSetting);

      expect(result).toStrictEqual(mockStatsSetting);
      expect(jest.spyOn(statisticsService, 'createStats')).toBeCalledTimes(1);
    });
  });

  describe('createSkillStats()', () => {
    it('should return a mockSkill', () => {
      const result = statisticsController.createSkillStats(mockStatsSkill);

      expect(result).toStrictEqual(mockStatsSkill);
      expect(jest.spyOn(statisticsService, 'createStats')).toBeCalledTimes(1);
    });
  });
});
