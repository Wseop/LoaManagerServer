import { Test, TestingModule } from '@nestjs/testing';
import { StatisticsService } from '../statistics.service';
import { StatisticsController } from '../statistics.controller';
import { StatisticsChaos } from '../dto/statistics-chaos.dto';
import { StatisticsGuardian } from '../dto/statistics-guardian.dto';
import { StatisticsSkill } from '../dto/statistics-skill.dto';
import { CreateChaosRewardDto } from '../chaos-rewards/dto/create-chaos-reward.dto';
import { CreateGuardianRewardDto } from '../guardian-rewards/dto/create-guardian-reward.dto';

class MockStatisticsService {
  getStatisticsChaos = jest.fn();
  createChaosReward = jest.fn();
  getStatisticsGuardian = jest.fn();
  createGuardianReward = jest.fn();
  getStatisticsSkill = jest.fn();
  getStatisticsAbility = jest.fn();
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
});
