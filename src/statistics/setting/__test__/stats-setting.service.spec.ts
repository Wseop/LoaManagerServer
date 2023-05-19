import { Model } from 'mongoose';
import { StatsSetting } from '../schemas/stats-setting.schema';
import { StatsSettingService } from '../stats-setting.service';
import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';

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

class MockStatsSettingModel {
  find = jest.fn().mockResolvedValue(mockStatsSetting);
  findOneAndUpdate = jest.fn().mockResolvedValue(mockStatsSetting);
}

describe('StatsSettingService', () => {
  let statsSettingService: StatsSettingService;
  let statsSettingModel: Model<StatsSetting>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StatsSettingService,
        {
          provide: getModelToken(StatsSetting.name),
          useClass: MockStatsSettingModel,
        },
      ],
    }).compile();

    statsSettingService = module.get<StatsSettingService>(StatsSettingService);
    statsSettingModel = module.get<Model<StatsSetting>>(
      getModelToken(StatsSetting.name),
    );
  });

  describe('findStatsSettinges', () => {
    it('should return statsSetting', async () => {
      const result = await statsSettingService.findStatsSettings();
      expect(result).toStrictEqual(mockStatsSetting);
      expect(jest.spyOn(statsSettingModel, 'find')).toBeCalledTimes(1);
    });
  });

  describe('findStatsSettingByClassName', () => {
    it('should return statsSetting', async () => {
      const result = await statsSettingService.findStatsSettingByClassName(
        'className',
      );
      expect(result).toStrictEqual(mockStatsSetting);
      expect(jest.spyOn(statsSettingModel, 'find')).toBeCalledTimes(1);
    });
  });

  describe('createStatsSetting', () => {
    it('should return statsSetting', async () => {
      const result = await statsSettingService.createStatsSetting(
        mockStatsSetting,
      );
      expect(result).toStrictEqual(mockStatsSetting);
      expect(jest.spyOn(statsSettingModel, 'findOneAndUpdate')).toBeCalledTimes(
        1,
      );
    });
  });
});
