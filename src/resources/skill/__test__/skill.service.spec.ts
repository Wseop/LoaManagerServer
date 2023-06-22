import { Model } from 'mongoose';
import { Skill } from '../schemas/skill.schema';
import { SkillService } from '../skill.service';
import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';

const mockSkill: Skill = {
  className: 'string',
  skills: [
    {
      skillName: 'string',
      skillCode: 0,
      iconPath: 'string',
      isCounter: false,
      tripods: [
        {
          tripodName: 'string',
          tripodCode: 0,
          iconIndex: 0,
        },
      ],
    },
  ],
};

class MockSkillModel {
  find = jest.fn().mockResolvedValue(mockSkill);
  findOne = jest.fn().mockResolvedValue(mockSkill);
  create = jest.fn().mockResolvedValue(mockSkill);
  replaceOne = jest.fn();
}

describe('SkillService', () => {
  let skillService: SkillService;
  let skillModel: Model<Skill>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SkillService,
        {
          provide: getModelToken(Skill.name),
          useClass: MockSkillModel,
        },
      ],
    }).compile();

    skillService = module.get<SkillService>(SkillService);
    skillModel = module.get<Model<Skill>>(getModelToken(Skill.name));
  });

  describe('findSkills', () => {
    it('should return skill', async () => {
      const result = await skillService.find();
      expect(result).toStrictEqual(mockSkill);
      expect(jest.spyOn(skillModel, 'find')).toBeCalledTimes(1);
    });
  });

  describe('createSkill', () => {
    it('should return skill', async () => {
      const result = await skillService.create(mockSkill);
      expect(result).toStrictEqual(mockSkill);
      expect(jest.spyOn(skillModel, 'create')).toBeCalledTimes(1);
    });
  });

  describe('replaceSkill', () => {
    it('should return null', async () => {
      jest.spyOn(skillModel, 'replaceOne').mockResolvedValue({
        acknowledged: false,
        matchedCount: 0,
        modifiedCount: 0,
        upsertedCount: 0,
        upsertedId: null,
      });

      const result = await skillService.replaceOne(mockSkill);
      expect(result).toBe(null);
      expect(jest.spyOn(skillModel, 'replaceOne')).toBeCalledTimes(1);
      expect(jest.spyOn(skillModel, 'findOne')).toBeCalledTimes(0);
    });

    it('should return skill', async () => {
      jest.spyOn(skillModel, 'replaceOne').mockResolvedValue({
        acknowledged: false,
        matchedCount: 1,
        modifiedCount: 0,
        upsertedCount: 0,
        upsertedId: null,
      });

      const result = await skillService.replaceOne(mockSkill);
      expect(result).toStrictEqual(mockSkill);
      expect(jest.spyOn(skillModel, 'replaceOne')).toBeCalledTimes(1);
      expect(jest.spyOn(skillModel, 'findOne')).toBeCalledTimes(1);
    });
  });
});
