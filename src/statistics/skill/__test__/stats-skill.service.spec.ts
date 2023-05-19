import { Model } from 'mongoose';
import { StatsSkill } from '../schemas/stats-skill.schema';
import { StatsSkillService } from '../stats-skill.service';
import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';

const mockStatsSkill: StatsSkill = {
  characterName: 'string',
  className: 'string',
  classEngraves: ['string'],
  skills: [
    {
      skillName: 'string',
      tripodNames: ['string'],
      runeName: 'string',
    },
  ],
};

class MockStatsSkillModel {
  find = jest.fn().mockResolvedValue(mockStatsSkill);
  findOneAndUpdate = jest.fn().mockResolvedValue(mockStatsSkill);
}

describe('StatsSkillService', () => {
  let statsSkillService: StatsSkillService;
  let statsSkillModel: Model<StatsSkill>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StatsSkillService,
        {
          provide: getModelToken(StatsSkill.name),
          useClass: MockStatsSkillModel,
        },
      ],
    }).compile();

    statsSkillService = module.get<StatsSkillService>(StatsSkillService);
    statsSkillModel = module.get<Model<StatsSkill>>(
      getModelToken(StatsSkill.name),
    );
  });

  describe('findStatsSkilles', () => {
    it('should return statsSkill', async () => {
      const result = await statsSkillService.findStatsSkills();
      expect(result).toStrictEqual(mockStatsSkill);
      expect(jest.spyOn(statsSkillModel, 'find')).toBeCalledTimes(1);
    });
  });

  describe('findStatsSkillByClassName', () => {
    it('should return statsSkill', async () => {
      const result = await statsSkillService.findStatsSkillByClassName(
        'className',
      );
      expect(result).toStrictEqual(mockStatsSkill);
      expect(jest.spyOn(statsSkillModel, 'find')).toBeCalledTimes(1);
    });
  });

  describe('createStatsSkill', () => {
    it('should return statsSkill', async () => {
      const result = await statsSkillService.createStatsSkill(mockStatsSkill);
      expect(result).toStrictEqual(mockStatsSkill);
      expect(jest.spyOn(statsSkillModel, 'findOneAndUpdate')).toBeCalledTimes(
        1,
      );
    });
  });
});
