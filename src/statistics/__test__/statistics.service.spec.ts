import { StatsChaos } from '../chaos/schemas/stats-chaos.schema';
import { StatsGuardian } from '../guardian/schemas/stats-guardian.schema';
import { StatsSetting } from '../setting/schemas/stats-setting.schema';
import { StatsSkill } from '../skill/schemas/stats-skill.schema';
import { StatisticsService } from '../statistics.service';
import { Test, TestingModule } from '@nestjs/testing';
import { StatsCategory } from '../enums/statistics-category.enum';
import { StatsChaosService } from '../chaos/stats-chaos.service';
import { StatsGuardianService } from '../guardian/stats-guardian.service';
import { StatsSettingService } from '../setting/stats-setting.service';
import { StatsSkillService } from '../skill/stats-skill.service';

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

class MockStatsChaosService {
  findStatsChaosByLevel = jest.fn().mockResolvedValue([mockStatsChaos]);
  createStatsChaos = jest.fn().mockResolvedValue(mockStatsChaos);
}
class MockStatsGuardianService {
  findStatsGuardianByLevel = jest.fn().mockResolvedValue([mockStatsGuardian]);
  createStatsGuardian = jest.fn().mockResolvedValue(mockStatsGuardian);
}
class MockStatsSettingService {
  createStatsSetting = jest.fn().mockResolvedValue(mockStatsSetting);
}
class MockStatsSkillService {
  createStatsSkill = jest.fn().mockResolvedValue(mockStatsSkill);
}

describe('StatisticsService', () => {
  let statisticsService: StatisticsService;
  let statsChaosService: StatsChaosService;
  let statsGuardianService: StatsGuardianService;
  let statsSettingService: StatsSettingService;
  let statsSkillService: StatsSkillService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StatisticsService,
        {
          provide: StatsChaosService,
          useClass: MockStatsChaosService,
        },
        {
          provide: StatsGuardianService,
          useClass: MockStatsGuardianService,
        },
        {
          provide: StatsSettingService,
          useClass: MockStatsSettingService,
        },
        {
          provide: StatsSkillService,
          useClass: MockStatsSkillService,
        },
      ],
    }).compile();

    statisticsService = module.get<StatisticsService>(StatisticsService);
    statsChaosService = module.get<StatsChaosService>(StatsChaosService);
    statsGuardianService =
      module.get<StatsGuardianService>(StatsGuardianService);
    statsSettingService = module.get<StatsSettingService>(StatsSettingService);
    statsSkillService = module.get<StatsSkillService>(StatsSkillService);
  });

  describe('getTotalStats', () => {
    it('should return total-chaos', async () => {
      const result = await statisticsService.getTotalStats(
        StatsCategory.Chaos,
        'level',
      );
      expect(result).toStrictEqual({
        count: 1,
        level: 'level',
        itemCounts: {
          silling: 0,
          shard: 0,
          destruction: 0,
          protection: 0,
          leapStone: 0,
          gem: 0,
        },
      });
      expect(
        jest.spyOn(statsChaosService, 'findStatsChaosByLevel'),
      ).toBeCalledTimes(1);
    });

    it('should return total-guardian', async () => {
      const result = await statisticsService.getTotalStats(
        StatsCategory.Guardian,
        'level',
      );
      expect(result).toStrictEqual({
        count: 1,
        level: 'level',
        itemCounts: {
          destruction: 0,
          protection: 0,
          leapStone: 0,
        },
      });
      expect(
        jest.spyOn(statsGuardianService, 'findStatsGuardianByLevel'),
      ).toBeCalledTimes(1);
    });

    it('should return null', async () => {
      const result = await statisticsService.getTotalStats(
        'invalid category' as StatsCategory,
        'level',
      );
      expect(result).toBe(null);
    });
  });

  describe('createStats', () => {
    it('should return chaos', async () => {
      const result = await statisticsService.createStats(
        StatsCategory.Chaos,
        mockStatsChaos,
      );
      expect(result).toStrictEqual(mockStatsChaos);
      expect(jest.spyOn(statsChaosService, 'createStatsChaos')).toBeCalledTimes(
        1,
      );
    });

    it('should return guardian', async () => {
      const result = await statisticsService.createStats(
        StatsCategory.Guardian,
        mockStatsGuardian,
      );
      expect(result).toStrictEqual(mockStatsGuardian);
      expect(
        jest.spyOn(statsGuardianService, 'createStatsGuardian'),
      ).toBeCalledTimes(1);
    });

    it('should return setting', async () => {
      const result = await statisticsService.createStats(
        StatsCategory.Setting,
        mockStatsSetting,
      );
      expect(result).toStrictEqual(mockStatsSetting);
      expect(
        jest.spyOn(statsSettingService, 'createStatsSetting'),
      ).toBeCalledTimes(1);
    });

    it('should return skill', async () => {
      const result = await statisticsService.createStats(
        StatsCategory.Skill,
        mockStatsSkill,
      );
      expect(result).toStrictEqual(mockStatsSkill);
      expect(jest.spyOn(statsSkillService, 'createStatsSkill')).toBeCalledTimes(
        1,
      );
    });

    it('should return null', async () => {
      const result = await statisticsService.createStats(
        'invalid category' as StatsCategory,
        mockStatsSetting,
      );
      expect(result).toBe(null);
    });
  });
});
