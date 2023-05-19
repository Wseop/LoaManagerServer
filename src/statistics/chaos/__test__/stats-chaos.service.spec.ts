import { Model } from 'mongoose';
import { StatsChaosService } from '../stats-chaos.service';
import { StatsChaos } from '../schemas/stats-chaos.schema';
import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';

const mockStatsChaos: StatsChaos = {
  level: 'string',
  count: 0,
  silling: 0,
  shard: 0,
  destruction: 0,
  protection: 0,
  leapStone: 0,
  gem: 0,
};

class MockStatsChaosModel {
  find = jest.fn().mockResolvedValue(mockStatsChaos);
  create = jest.fn().mockResolvedValue(mockStatsChaos);
}

describe('StatsChaosService', () => {
  let statsChaosService: StatsChaosService;
  let statsChaosModel: Model<StatsChaos>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StatsChaosService,
        {
          provide: getModelToken(StatsChaos.name),
          useClass: MockStatsChaosModel,
        },
      ],
    }).compile();

    statsChaosService = module.get<StatsChaosService>(StatsChaosService);
    statsChaosModel = module.get<Model<StatsChaos>>(
      getModelToken(StatsChaos.name),
    );
  });

  describe('findStatsChaoses', () => {
    it('should return statsChaos', async () => {
      const result = await statsChaosService.findStatsChaoses();
      expect(result).toStrictEqual(mockStatsChaos);
      expect(jest.spyOn(statsChaosModel, 'find')).toBeCalledTimes(1);
    });
  });

  describe('findStatsChaosByLevel', () => {
    it('should return statsChaos', async () => {
      const result = await statsChaosService.findStatsChaosByLevel('level');
      expect(result).toStrictEqual(mockStatsChaos);
      expect(jest.spyOn(statsChaosModel, 'find')).toBeCalledTimes(1);
    });
  });

  describe('createStatsChaos', () => {
    it('should return statsChaos', async () => {
      const result = await statsChaosService.createStatsChaos(mockStatsChaos);
      expect(result).toStrictEqual(mockStatsChaos);
      expect(jest.spyOn(statsChaosModel, 'create')).toBeCalledTimes(1);
    });
  });
});
