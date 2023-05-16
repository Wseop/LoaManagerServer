import { Model } from 'mongoose';
import { StatsChaos } from '../schemas/stats-chaos.schema';
import { StatsGuardian } from '../schemas/stats-guardian.schema';
import { StatsSetting } from '../schemas/stats-setting.schema';
import { StatsSkill } from '../schemas/stats-skill.schema';
import { StatisticsService } from '../statistics.service';
import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';

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

  describe('findStatsByLevel()', () => {
    it('should return a mockStatsChaos', async () => {
      const result = await statisticsService.findStatsByLevel('chaos', 'level');

      expect(result).toStrictEqual(mockStatsChaos);
      expect(jest.spyOn(statsChaosModel, 'find')).toBeCalledTimes(1);
    });
    it('should return a mockStatsGuardian', async () => {
      const result = await statisticsService.findStatsByLevel(
        'guardian',
        'level',
      );

      expect(result).toStrictEqual(mockStatsGuardian);
      expect(jest.spyOn(statsGuardianModel, 'find')).toBeCalledTimes(1);
    });
  });

  describe('findStatsByClass()', () => {
    it('should return a mockStatsSetting', async () => {
      const result = await statisticsService.findStatsByClass(
        'setting',
        'class',
      );

      expect(result).toStrictEqual(mockStatsSetting);
      expect(jest.spyOn(statsSettingModel, 'find')).toBeCalledTimes(1);
    });
    it('should return a mockStatsSkill', async () => {
      const result = await statisticsService.findStatsByClass('skill', 'class');

      expect(result).toStrictEqual(mockStatsSkill);
      expect(jest.spyOn(statsSkillModel, 'find')).toBeCalledTimes(1);
    });
  });

  describe('createStats()', () => {
    it('should return a mockStatsChaos', async () => {
      const result = await statisticsService.createStats(
        'chaos',
        mockStatsChaos,
      );

      expect(result).toStrictEqual(mockStatsChaos);
      expect(jest.spyOn(statsChaosModel, 'create')).toBeCalledTimes(1);
    });
    it('should return a mockStatsGuardian', async () => {
      const result = await statisticsService.createStats(
        'guardian',
        mockStatsGuardian,
      );

      expect(result).toStrictEqual(mockStatsGuardian);
      expect(jest.spyOn(statsGuardianModel, 'create')).toBeCalledTimes(1);
    });
    it('should return a mockStatsSetting', async () => {
      const result = await statisticsService.createStats(
        'setting',
        mockStatsSetting,
      );

      expect(result).toStrictEqual(mockStatsSetting);
      expect(jest.spyOn(statsSettingModel, 'findOneAndUpdate')).toBeCalledTimes(
        1,
      );
    });
    it('should return a mockStatsSkill', async () => {
      const result = await statisticsService.createStats(
        'skill',
        mockStatsSkill,
      );

      expect(result).toStrictEqual(mockStatsSkill);
      expect(jest.spyOn(statsSkillModel, 'findOneAndUpdate')).toBeCalledTimes(
        1,
      );
    });
  });
});
