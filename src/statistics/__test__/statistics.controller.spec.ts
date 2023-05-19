import { Test, TestingModule } from '@nestjs/testing';
import { StatisticsController } from '../statistics.controller';
import { StatisticsService } from '../statistics.service';
import { StatsChaos } from '../chaos/schemas/stats-chaos.schema';
import { StatsGuardian } from '../guardian/schemas/stats-guardian.schema';
import { StatsSetting } from '../setting/schemas/stats-setting.schema';
import { StatsSkill } from '../skill/schemas/stats-skill.schema';
import { StatsCategory } from '../enums/statistics-category.enum';
import { TotalStatsChaos } from '../chaos/interfaces/total-stats-chaos.interface';
import { TotalStatsGuardian } from '../guardian/interfaces/total-stats-guardian.interface';

const mockTotalStatsChaos: TotalStatsChaos = {
  count: 0,
  level: 'level',
  itemCounts: {
    silling: 0,
    shard: 0,
    destruction: 0,
    protection: 0,
    leapStone: 0,
    gem: 0,
  },
};
const mockTotalStatsGuardian: TotalStatsGuardian = {
  count: 0,
  level: 'level',
  itemCounts: {
    destruction: 0,
    protection: 0,
    leapStone: 0,
  },
};
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
  characterName: 'string',
  className: 'string',
  itemLevel: 0,
  ability: 'string',
  elixir: 'string',
  engraves: [
    {
      code: 0,
      level: 0,
    },
  ],
  itemSet: 'string',
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
  getTotalStats = jest.fn((category, level) => {
    switch (category) {
      case StatsCategory.Chaos:
        return mockTotalStatsChaos;
      case StatsCategory.Guardian:
        return mockTotalStatsGuardian;
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

  describe('GET', () => {
    it('should return total-chaos', () => {
      const result = statisticsController.getTotalStatsChaos('level');
      expect(result).toStrictEqual(mockTotalStatsChaos);
      expect(jest.spyOn(statisticsService, 'getTotalStats')).toBeCalledTimes(1);
    });

    it('should return total-guardian', () => {
      const result = statisticsController.getTotalStatsGuardian('level');
      expect(result).toStrictEqual(mockTotalStatsGuardian);
      expect(jest.spyOn(statisticsService, 'getTotalStats')).toBeCalledTimes(1);
    });
  });

  describe('POST', () => {
    it('should return chaos', () => {
      const result = statisticsController.createChaosStats(mockStatsChaos);
      expect(result).toStrictEqual(mockStatsChaos);
      expect(jest.spyOn(statisticsService, 'createStats')).toBeCalledTimes(1);
    });

    it('should return guardian', () => {
      const result =
        statisticsController.createGuardianStats(mockStatsGuardian);
      expect(result).toStrictEqual(mockStatsGuardian);
      expect(jest.spyOn(statisticsService, 'createStats')).toBeCalledTimes(1);
    });

    it('should return setting', () => {
      const result = statisticsController.createSettingStats(mockStatsSetting);
      expect(result).toStrictEqual(mockStatsSetting);
      expect(jest.spyOn(statisticsService, 'createStats')).toBeCalledTimes(1);
    });

    it('should return skill', () => {
      const result = statisticsController.createSkillStats(mockStatsSkill);
      expect(result).toStrictEqual(mockStatsSkill);
      expect(jest.spyOn(statisticsService, 'createStats')).toBeCalledTimes(1);
    });
  });
});
