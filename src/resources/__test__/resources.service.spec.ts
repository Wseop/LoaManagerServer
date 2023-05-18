import { Model } from 'mongoose';
import { ResourcesService } from '../resources.service';
import { Class } from '../schemas/class.schema';
import { Engrave } from '../schemas/engrave.schema';
import { Reward } from '../schemas/reward.schema';
import { Skill } from '../schemas/skill.schema';
import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { ResourceCategory } from '../enums/resource-category.enum';

const mockClass: Class = {
  parent: 'parent',
  child: ['child'],
};

const mockEngrave: Engrave = {
  code: 0,
  engraveName: 'engraveName',
  className: 'className',
  isPenalty: false,
};

const mockReward: Reward = {
  content: 'content',
  rewards: [
    {
      level: 'level',
      cost: 0,
      items: [
        {
          item: 'item',
          count: 0,
        },
      ],
    },
  ],
};

const mockSkill: Skill = {
  className: 'className',
  skills: [
    {
      skillName: 'skillName',
      skillCode: 0,
      iconPath: 'iconPath',
      isCounter: false,
      tripods: [
        {
          tripodName: 'tripodName',
          tripodCode: 0,
          iconIndex: 0,
        },
      ],
    },
  ],
};

class MockClassModel {
  find = jest.fn().mockReturnValue(mockClass);
  create = jest.fn().mockReturnValue(mockClass);
  findOne = jest.fn().mockReturnValue(mockClass);
  replaceOne = jest.fn();
}

class MockEngraveModel {
  find = jest.fn().mockReturnValue(mockEngrave);
  create = jest.fn().mockReturnValue(mockEngrave);
  findOne = jest.fn().mockReturnValue(mockEngrave);
  replaceOne = jest.fn();
}

class MockRewardModel {
  find = jest.fn().mockReturnValue(mockReward);
  findOne = jest.fn().mockReturnValue(mockReward);
  create = jest.fn().mockReturnValue(mockReward);
  replaceOne = jest.fn();
}

class MockSkillModel {
  find = jest.fn().mockReturnValue(mockSkill);
  findOne = jest.fn().mockReturnValue(mockSkill);
  create = jest.fn().mockReturnValue(mockSkill);
  replaceOne = jest.fn();
}

describe('ResourcesService', () => {
  let resourcesService: ResourcesService;
  let classModel: Model<Class>;
  let engraveModel: Model<Engrave>;
  let rewardModel: Model<Reward>;
  let skillModel: Model<Skill>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ResourcesService,
        {
          provide: getModelToken(Class.name),
          useClass: MockClassModel,
        },
        {
          provide: getModelToken(Engrave.name),
          useClass: MockEngraveModel,
        },
        {
          provide: getModelToken(Reward.name),
          useClass: MockRewardModel,
        },
        {
          provide: getModelToken(Skill.name),
          useClass: MockSkillModel,
        },
      ],
    }).compile();

    resourcesService = module.get<ResourcesService>(ResourcesService);
    classModel = module.get<Model<Class>>(getModelToken(Class.name));
    engraveModel = module.get<Model<Engrave>>(getModelToken(Engrave.name));
    rewardModel = module.get<Model<Reward>>(getModelToken(Reward.name));
    skillModel = module.get<Model<Skill>>(getModelToken(Skill.name));
  });

  describe('findResources()', () => {
    it('should return mockClass', async () => {
      const result = await resourcesService.findResources(
        ResourceCategory.Class,
      );

      expect(result).toStrictEqual(mockClass);
      expect(jest.spyOn(classModel, 'find')).toBeCalledTimes(1);
    });

    it('should return mockEngrave', async () => {
      const result = await resourcesService.findResources(
        ResourceCategory.Engrave,
      );

      expect(result).toStrictEqual(mockEngrave);
      expect(jest.spyOn(engraveModel, 'find')).toBeCalledTimes(1);
    });

    it('should return mockReward', async () => {
      const result = await resourcesService.findResources(
        ResourceCategory.Reward,
      );

      expect(result).toStrictEqual(mockReward);
      expect(jest.spyOn(rewardModel, 'find')).toBeCalledTimes(1);
    });

    it('should return mockSkill', async () => {
      const result = await resourcesService.findResources(
        ResourceCategory.Skill,
      );

      expect(result).toStrictEqual(mockSkill);
      expect(jest.spyOn(skillModel, 'find')).toBeCalledTimes(1);
    });

    it('should return null', async () => {
      const result = await resourcesService.findResources(
        'invalid category' as ResourceCategory,
      );

      expect(result).toStrictEqual(null);
    });
  });

  describe('findRewardByContent()', () => {
    it('should return mockReward', async () => {
      const result = await resourcesService.findRewardByContent('');

      expect(result).toStrictEqual(mockReward);
      expect(jest.spyOn(rewardModel, 'findOne')).toBeCalledTimes(1);
    });
  });

  describe('findSkillByClass', () => {
    it('should return mockSkill', async () => {
      const result = await resourcesService.findSkillByClass('');

      expect(result).toStrictEqual(mockSkill);
      expect(jest.spyOn(skillModel, 'findOne')).toBeCalledTimes(1);
    });
  });

  describe('createResource()', () => {
    it('should return mockClass', async () => {
      const result = await resourcesService.createResource(
        ResourceCategory.Class,
        mockClass,
      );

      expect(result).toStrictEqual(mockClass);
      expect(jest.spyOn(classModel, 'create')).toBeCalledTimes(1);
    });

    it('should return mockEngrave', async () => {
      const result = await resourcesService.createResource(
        ResourceCategory.Engrave,
        mockEngrave,
      );

      expect(result).toStrictEqual(mockEngrave);
      expect(jest.spyOn(engraveModel, 'create')).toBeCalledTimes(1);
    });

    it('should return mockReward', async () => {
      const result = await resourcesService.createResource(
        ResourceCategory.Reward,
        mockReward,
      );

      expect(result).toStrictEqual(mockReward);
      expect(jest.spyOn(rewardModel, 'create')).toBeCalledTimes(1);
    });

    it('should return mockSkill', async () => {
      const result = await resourcesService.createResource(
        ResourceCategory.Skill,
        mockSkill,
      );

      expect(result).toStrictEqual(mockSkill);
      expect(jest.spyOn(skillModel, 'create')).toBeCalledTimes(1);
    });

    it('should return null', async () => {
      const result = await resourcesService.createResource(
        'invalid category' as ResourceCategory,
        mockSkill,
      );

      expect(result).toStrictEqual(null);
    });
  });

  describe('replaceResource()', () => {
    it('should return mockClass', async () => {
      jest.spyOn(classModel, 'replaceOne').mockResolvedValue({
        acknowledged: false,
        matchedCount: 1,
        modifiedCount: 0,
        upsertedCount: 0,
        upsertedId: null,
      });

      const result = await resourcesService.replaceResource(
        ResourceCategory.Class,
        mockClass,
      );

      expect(result).toStrictEqual(mockClass);
      expect(jest.spyOn(classModel, 'replaceOne')).toBeCalledTimes(1);
      expect(jest.spyOn(classModel, 'findOne')).toBeCalledTimes(1);
    });

    it('should return mockEngrave', async () => {
      jest.spyOn(engraveModel, 'replaceOne').mockResolvedValue({
        acknowledged: false,
        matchedCount: 1,
        modifiedCount: 0,
        upsertedCount: 0,
        upsertedId: null,
      });

      const result = await resourcesService.replaceResource(
        ResourceCategory.Engrave,
        mockEngrave,
      );

      expect(result).toStrictEqual(mockEngrave);
      expect(jest.spyOn(engraveModel, 'replaceOne')).toBeCalledTimes(1);
      expect(jest.spyOn(engraveModel, 'findOne')).toBeCalledTimes(1);
    });

    it('should return mockReward', async () => {
      jest.spyOn(rewardModel, 'replaceOne').mockResolvedValue({
        acknowledged: false,
        matchedCount: 1,
        modifiedCount: 0,
        upsertedCount: 0,
        upsertedId: null,
      });

      const result = await resourcesService.replaceResource(
        ResourceCategory.Reward,
        mockReward,
      );

      expect(result).toStrictEqual(mockReward);
      expect(jest.spyOn(rewardModel, 'replaceOne')).toBeCalledTimes(1);
      expect(jest.spyOn(rewardModel, 'findOne')).toBeCalledTimes(1);
    });

    it('should return mockSkill', async () => {
      jest.spyOn(skillModel, 'replaceOne').mockResolvedValue({
        acknowledged: false,
        matchedCount: 1,
        modifiedCount: 0,
        upsertedCount: 0,
        upsertedId: null,
      });

      const result = await resourcesService.replaceResource(
        ResourceCategory.Skill,
        mockSkill,
      );

      expect(result).toStrictEqual(mockSkill);
      expect(jest.spyOn(skillModel, 'replaceOne')).toBeCalledTimes(1);
      expect(jest.spyOn(skillModel, 'findOne')).toBeCalledTimes(1);
    });

    it('should return null - 1', async () => {
      const result = await resourcesService.replaceResource(
        'invalid category' as ResourceCategory,
        mockSkill,
      );

      expect(result).toStrictEqual(null);
    });

    it('should return null - 2', async () => {
      jest.spyOn(skillModel, 'replaceOne').mockResolvedValue({
        acknowledged: false,
        matchedCount: 0,
        modifiedCount: 0,
        upsertedCount: 0,
        upsertedId: null,
      });

      const result = await resourcesService.replaceResource(
        ResourceCategory.Skill,
        mockSkill,
      );

      expect(result).toStrictEqual(null);
      expect(jest.spyOn(skillModel, 'replaceOne')).toBeCalledTimes(1);
    });
  });
});
