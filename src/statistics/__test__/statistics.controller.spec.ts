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

  describe('POST', () => {
    it('should return chaos', () => {
      const result = statisticsController.createChaosStats(mockStatsChaos);

      expect(result).toStrictEqual(mockStatsChaos);
      expect(jest.spyOn(statisticsService, 'createStats')).toBeCalledTimes(1);
    });
  });

  describe('createGuardianStats()', () => {
    it('should return guardian', () => {
      const result =
        statisticsController.createGuardianStats(mockStatsGuardian);

      expect(result).toStrictEqual(mockStatsGuardian);
      expect(jest.spyOn(statisticsService, 'createStats')).toBeCalledTimes(1);
    });
  });

  describe('createSettingStats()', () => {
    it('should return setting', () => {
      const result = statisticsController.createSettingStats(mockStatsSetting);

      expect(result).toStrictEqual(mockStatsSetting);
      expect(jest.spyOn(statisticsService, 'createStats')).toBeCalledTimes(1);
    });
  });

  describe('createSkillStats()', () => {
    it('should return skill', () => {
      const result = statisticsController.createSkillStats(mockStatsSkill);

      expect(result).toStrictEqual(mockStatsSkill);
      expect(jest.spyOn(statisticsService, 'createStats')).toBeCalledTimes(1);
    });
  });
});
