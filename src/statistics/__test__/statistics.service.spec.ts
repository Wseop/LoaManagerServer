import { Model } from 'mongoose';
import { StatsChaos } from '../schemas/stats-chaos.schema';
import { StatsGuardian } from '../schemas/stats-guardian.schema';
import { StatsSetting } from '../schemas/stats-setting.schema';
import { StatsSkill } from '../schemas/stats-skill.schema';
import { StatisticsService } from '../statistics.service';
import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
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

class MockStatsChaosModel {
  find = jest.fn().mockReturnValue(mockStatsChaos);
  create = jest.fn().mockReturnValue(mockStatsChaos);
}

class MockStatsGuardianModel {
  find = jest.fn().mockReturnValue(mockStatsGuardian);
  create = jest.fn().mockReturnValue(mockStatsGuardian);
}

class MockStatsSettingModel {
  find = jest.fn().mockReturnValue(mockStatsSetting);
  findOneAndUpdate = jest.fn().mockReturnValue(mockStatsSetting);
}

class MockStatsSkillModel {
  find = jest.fn().mockReturnValue(mockStatsSkill);
  findOneAndUpdate = jest.fn().mockReturnValue(mockStatsSkill);
}

describe('StatisticsService', () => {
  let statisticsService: StatisticsService;
  let statsChaosModel: Model<StatsChaos>;
  let statsGuardianModel: Model<StatsGuardian>;
  let statsSettingModel: Model<StatsSetting>;
  let statsSkillModel: Model<StatsSkill>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StatisticsService,
        {
          provide: getModelToken(StatsChaos.name),
          useClass: MockStatsChaosModel,
        },
        {
          provide: getModelToken(StatsGuardian.name),
          useClass: MockStatsGuardianModel,
        },
        {
          provide: getModelToken(StatsSetting.name),
          useClass: MockStatsSettingModel,
        },
        {
          provide: getModelToken(StatsSkill.name),
          useClass: MockStatsSkillModel,
        },
      ],
    }).compile();

    statisticsService = module.get<StatisticsService>(StatisticsService);
    statsChaosModel = module.get<Model<StatsChaos>>(
      getModelToken(StatsChaos.name),
    );
    statsGuardianModel = module.get<Model<StatsGuardian>>(
      getModelToken(StatsGuardian.name),
    );
    statsSettingModel = module.get<Model<StatsSetting>>(
      getModelToken(StatsSetting.name),
    );
    statsSkillModel = module.get<Model<StatsSkill>>(
      getModelToken(StatsSkill.name),
    );
  });

  describe('findStats', () => {
    it('should return chaos', async () => {
      const result = await statisticsService.findStats(StatsCategory.Chaos);

      expect(result).toStrictEqual(mockStatsChaos);
      expect(jest.spyOn(statsChaosModel, 'find')).toBeCalledTimes(1);
    });

    it('should return guardian', async () => {
      const result = await statisticsService.findStats(StatsCategory.Guardian);

      expect(result).toStrictEqual(mockStatsGuardian);
      expect(jest.spyOn(statsGuardianModel, 'find')).toBeCalledTimes(1);
    });

    it('should return setting', async () => {
      const result = await statisticsService.findStats(StatsCategory.Setting);

      expect(result).toStrictEqual(mockStatsSetting);
      expect(jest.spyOn(statsSettingModel, 'find')).toBeCalledTimes(1);
    });

    it('should return skill', async () => {
      const result = await statisticsService.findStats(StatsCategory.Skill);

      expect(result).toStrictEqual(mockStatsSkill);
      expect(jest.spyOn(statsSkillModel, 'find')).toBeCalledTimes(1);
    });

    it('should return null', async () => {
      const result = await statisticsService.findStats(
        'invalid category' as StatsCategory,
      );

      expect(result).toStrictEqual(null);
    });
  });

  describe('findStatsByLevel', () => {
    it('should return chaos', async () => {
      const result = await statisticsService.findStatsByLevel(
        StatsCategory.Chaos,
        '',
      );

      expect(result).toStrictEqual(mockStatsChaos);
      expect(jest.spyOn(statsChaosModel, 'find')).toBeCalledTimes(1);
    });

    it('should return guardian', async () => {
      const result = await statisticsService.findStatsByLevel(
        StatsCategory.Guardian,
        '',
      );

      expect(result).toStrictEqual(mockStatsGuardian);
      expect(jest.spyOn(statsGuardianModel, 'find')).toBeCalledTimes(1);
    });

    it('should return null', async () => {
      const result = await statisticsService.findStatsByLevel(
        StatsCategory.Setting,
        '',
      );

      expect(result).toBe(null);
    });
  });

  describe('findStatsByClass', () => {
    it('should return setting', async () => {
      const result = await statisticsService.findStatsByClass(
        StatsCategory.Setting,
        '',
      );

      expect(result).toStrictEqual(mockStatsSetting);
      expect(jest.spyOn(statsSettingModel, 'find')).toBeCalledTimes(1);
    });

    it('should return skill', async () => {
      const result = await statisticsService.findStatsByClass(
        StatsCategory.Skill,
        '',
      );

      expect(result).toStrictEqual(mockStatsSkill);
      expect(jest.spyOn(statsSkillModel, 'find')).toBeCalledTimes(1);
    });

    it('should return null', async () => {
      const result = await statisticsService.findStatsByClass(
        StatsCategory.Chaos,
        '',
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
      expect(jest.spyOn(statsChaosModel, 'create')).toBeCalledTimes(1);
    });

    it('should return guardian', async () => {
      const result = await statisticsService.createStats(
        StatsCategory.Guardian,
        mockStatsGuardian,
      );

      expect(result).toStrictEqual(mockStatsGuardian);
      expect(jest.spyOn(statsGuardianModel, 'create')).toBeCalledTimes(1);
    });

    it('should return setting', async () => {
      const result = await statisticsService.createStats(
        StatsCategory.Setting,
        mockStatsSetting,
      );

      expect(result).toStrictEqual(mockStatsSetting);
      expect(jest.spyOn(statsSettingModel, 'findOneAndUpdate')).toBeCalledTimes(
        1,
      );
    });

    it('should return skill', async () => {
      const result = await statisticsService.createStats(
        StatsCategory.Skill,
        mockStatsSkill,
      );

      expect(result).toStrictEqual(mockStatsSkill);
      expect(jest.spyOn(statsSkillModel, 'findOneAndUpdate')).toBeCalledTimes(
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
