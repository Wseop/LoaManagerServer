import { Test, TestingModule } from '@nestjs/testing';
import { StatisticsController } from '../statistics.controller';
import { StatisticsService } from '../statistics.service';
import { StatsChaos } from '../schemas/stats-chaos.schema';
import { StatsGuardian } from '../schemas/stats-guardian.schema';
import { StatsSetting } from '../schemas/stats-setting.schema';
import { StatsSkill } from '../schemas/stats-skill.schema';
import { StatsCategory } from '../enums/statistics-category.enum';

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
  findTotalStatsByLevel = jest.fn((category: StatsCategory, level) => {
    switch (category) {
      case StatsCategory.Chaos:
        return mockStatsChaos;
      case StatsCategory.Guardian:
        return mockStatsGuardian;
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
    it('should return chaos', () => {
      const result = statisticsController.getTotalStatsChaosByLevel('');
      expect(result).toStrictEqual(mockStatsChaos);
      expect(
        jest.spyOn(statisticsService, 'findTotalStatsByLevel'),
      ).toBeCalledTimes(1);
    });

    it('should return guardian', () => {
      const result = statisticsController.getTotalStatsGuardianByLevel('');
      expect(result).toStrictEqual(mockStatsGuardian);
      expect(
        jest.spyOn(statisticsService, 'findTotalStatsByLevel'),
      ).toBeCalledTimes(1);
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
