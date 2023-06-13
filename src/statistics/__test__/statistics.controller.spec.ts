import { Test, TestingModule } from '@nestjs/testing';
import { StatisticsService } from '../statistics.service';
import { StatisticsController } from '../statistics.controller';

class MockStatisticsService {
  getStatisticsChaos = jest.fn().mockReturnValue(true);
  createChaosReward = jest.fn().mockReturnValue(true);
  getStatisticsGuardian = jest.fn().mockReturnValue(true);
  createGuardianReward = jest.fn().mockReturnValue(true);
  getStatisticsSkill = jest.fn().mockReturnValue(true);
  getStatisticsAbility = jest.fn().mockReturnValue(true);
  getStatisticsElixir = jest.fn().mockReturnValue(true);
  getStatisticsEngrave = jest.fn().mockReturnValue(true);
  getStatisticsSet = jest.fn().mockReturnValue(true);
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

  describe('Chaos', () => {
    it('should return true - 1', () => {
      const result = statisticsController.getStatisticsChaos('');
      expect(result).toBe(true);
      expect(
        jest.spyOn(statisticsService, 'getStatisticsChaos'),
      ).toBeCalledTimes(1);
    });

    it('should return true - 2', () => {
      const result = statisticsController.createChaosReward({
        level: 'level',
        count: 0,
        silling: 0,
        shard: 0,
        destructionStone: 0,
        protectionStone: 0,
        leapStone: 0,
        gem: 0,
      });
      expect(result).toBe(true);
      expect(
        jest.spyOn(statisticsService, 'createChaosReward'),
      ).toBeCalledTimes(1);
    });
  });

  describe('Guardian', () => {
    it('should return true - 1', () => {
      const result = statisticsController.getStatisticsGuardian('');
      expect(result).toBe(true);
      expect(
        jest.spyOn(statisticsService, 'getStatisticsGuardian'),
      ).toBeCalledTimes(1);
    });

    it('should return true - 2', () => {
      const result = statisticsController.createGuardianReward({
        level: 'level',
        count: 0,
        destructionStone: 0,
        protectionStone: 0,
        leapStone: 0,
      });
      expect(result).toBe(true);
      expect(
        jest.spyOn(statisticsService, 'createGuardianReward'),
      ).toBeCalledTimes(1);
    });
  });

  describe('Skill', () => {
    it('should return true', () => {
      const result = statisticsController.getStatisticsSkill('');
      expect(result).toBe(true);
      expect(
        jest.spyOn(statisticsService, 'getStatisticsSkill'),
      ).toBeCalledTimes(1);
    });
  });

  describe('Ability', () => {
    it('should return true - 1', () => {
      const result = statisticsController.getStatisticsAbility();
      expect(result).toBe(true);
      expect(
        jest.spyOn(statisticsService, 'getStatisticsAbility'),
      ).toBeCalledTimes(1);
    });

    it('should return true - 2', () => {
      const result = statisticsController.getStatisticsAbilitByClassName('');
      expect(result).toBe(true);
      expect(
        jest.spyOn(statisticsService, 'getStatisticsAbility'),
      ).toBeCalledTimes(1);
    });
  });

  describe('Elixir', () => {
    it('should return true - 1', () => {
      const result = statisticsController.getStatisticsElixir();
      expect(result).toBe(true);
      expect(
        jest.spyOn(statisticsService, 'getStatisticsElixir'),
      ).toBeCalledTimes(1);
    });

    it('should return true - 2', () => {
      const result = statisticsController.getStatisticsElixirByClassName('');
      expect(result).toBe(true);
      expect(
        jest.spyOn(statisticsService, 'getStatisticsElixir'),
      ).toBeCalledTimes(1);
    });
  });

  describe('Engrave', () => {
    it('should return true - 1', () => {
      const result = statisticsController.getStatisticsEngrave();
      expect(result).toBe(true);
      expect(
        jest.spyOn(statisticsService, 'getStatisticsEngrave'),
      ).toBeCalledTimes(1);
    });

    it('should return true - 2', () => {
      const result = statisticsController.getStatisticsEngraveByClassName('');
      expect(result).toBe(true);
      expect(
        jest.spyOn(statisticsService, 'getStatisticsEngrave'),
      ).toBeCalledTimes(1);
    });
  });

  describe('Set', () => {
    it('should return true - 1', () => {
      const result = statisticsController.getStatisticsSet();
      expect(result).toBe(true);
      expect(jest.spyOn(statisticsService, 'getStatisticsSet')).toBeCalledTimes(
        1,
      );
    });

    it('should return true - 2', () => {
      const result = statisticsController.getStatisticsSetByClassName('');
      expect(result).toBe(true);
      expect(jest.spyOn(statisticsService, 'getStatisticsSet')).toBeCalledTimes(
        1,
      );
    });
  });
});
