import { Model } from 'mongoose';
import { StatsGuardian } from '../schemas/stats-guardian.schema';
import { StatsGuardianService } from '../stats-guardian.service';
import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';

const mockStatsGuardian: StatsGuardian = {
  level: 'string',
  count: 0,
  destruction: 0,
  protection: 0,
  leapStone: 0,
};

class MockStatsGuardianModel {
  find = jest.fn().mockResolvedValue(mockStatsGuardian);
  create = jest.fn().mockResolvedValue(mockStatsGuardian);
}

describe('StatsGuardianService', () => {
  let statsGuardianService: StatsGuardianService;
  let statsGuardianModel: Model<StatsGuardian>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StatsGuardianService,
        {
          provide: getModelToken(StatsGuardian.name),
          useClass: MockStatsGuardianModel,
        },
      ],
    }).compile();

    statsGuardianService =
      module.get<StatsGuardianService>(StatsGuardianService);
    statsGuardianModel = module.get<Model<StatsGuardian>>(
      getModelToken(StatsGuardian.name),
    );
  });

  describe('findStatsGuardianes', () => {
    it('should return statsGuardian', async () => {
      const result = await statsGuardianService.findStatsGuardians();
      expect(result).toStrictEqual(mockStatsGuardian);
      expect(jest.spyOn(statsGuardianModel, 'find')).toBeCalledTimes(1);
    });
  });

  describe('findStatsGuardianByLevel', () => {
    it('should return statsGuardian', async () => {
      const result = await statsGuardianService.findStatsGuardianByLevel(
        'level',
      );
      expect(result).toStrictEqual(mockStatsGuardian);
      expect(jest.spyOn(statsGuardianModel, 'find')).toBeCalledTimes(1);
    });
  });

  describe('createStatsGuardian', () => {
    it('should return statsGuardian', async () => {
      const result = await statsGuardianService.createStatsGuardian(
        mockStatsGuardian,
      );
      expect(result).toStrictEqual(mockStatsGuardian);
      expect(jest.spyOn(statsGuardianModel, 'create')).toBeCalledTimes(1);
    });
  });
});
