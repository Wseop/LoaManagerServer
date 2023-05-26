import { Test, TestingModule } from '@nestjs/testing';
import { ResourcesController } from '../resources.controller';
import { ResourcesService } from '../resources.service';
import { Class } from '../class/schemas/class.schema';
import { Engrave } from '../engrave/schemas/engrave.schema';
import { Reward } from '../reward/schemas/reward.schema';
import { Skill } from '../skill/schemas/skill.schema';
import { ResourceCategory } from '../enums/resource-category.enum';

const mockClass: Class = {
  parent: 'string',
  child: ['string'],
};
const mockEngrave: Engrave = {
  code: 0,
  engraveName: 'string',
  className: 'string',
  isPenalty: true,
};
const mockReward: Reward = {
  content: 'string',
  rewards: [
    {
      level: 'string',
      cost: 0,
      items: [
        {
          item: 'string',
          count: 0,
        },
      ],
    },
  ],
};
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

class MockResourcesService {
  findResources = jest.fn((category: ResourceCategory) => {
    switch (category) {
      case ResourceCategory.Class:
        return mockClass;
      case ResourceCategory.Engrave:
        return mockEngrave;
      case ResourceCategory.Reward:
        return mockReward;
      case ResourceCategory.Skill:
        return mockSkill;
    }
  });
  findRewardByContent = jest.fn().mockReturnValue(mockReward);
  findSkillByClassName = jest.fn().mockReturnValue(mockSkill);
  createResource = jest.fn((category: ResourceCategory, dto) => {
    switch (category) {
      case ResourceCategory.Class:
        return mockClass;
      case ResourceCategory.Engrave:
        return mockEngrave;
      case ResourceCategory.Reward:
        return mockReward;
      case ResourceCategory.Skill:
        return mockSkill;
    }
  });
  replaceResource = jest.fn((category: ResourceCategory, dto) => {
    switch (category) {
      case ResourceCategory.Class:
        return mockClass;
      case ResourceCategory.Engrave:
        return mockEngrave;
      case ResourceCategory.Reward:
        return mockReward;
      case ResourceCategory.Skill:
        return mockSkill;
    }
  });
}

describe('ResourcesController', () => {
  let resourcesController: ResourcesController;
  let resourcesService: ResourcesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ResourcesController],
      providers: [
        {
          provide: ResourcesService,
          useClass: MockResourcesService,
        },
      ],
    }).compile();

    resourcesController = module.get<ResourcesController>(ResourcesController);
    resourcesService = module.get<ResourcesService>(ResourcesService);
  });

  describe('GET', () => {
    it('should return class', () => {
      const result = resourcesController.findClasses();
      expect(result).toStrictEqual(mockClass);
      expect(jest.spyOn(resourcesService, 'findResources')).toBeCalledTimes(1);
    });

    it('should return engrave', () => {
      const result = resourcesController.findEngraves();
      expect(result).toStrictEqual(mockEngrave);
      expect(jest.spyOn(resourcesService, 'findResources')).toBeCalledTimes(1);
    });

    it('should return reward - 1', () => {
      const result = resourcesController.findRewards();
      expect(result).toStrictEqual(mockReward);
      expect(jest.spyOn(resourcesService, 'findResources')).toBeCalledTimes(1);
    });

    it('should return reward - 2', () => {
      const result = resourcesController.findRewardByContent('');
      expect(result).toStrictEqual(mockReward);
      expect(
        jest.spyOn(resourcesService, 'findRewardByContent'),
      ).toBeCalledTimes(1);
    });

    it('should return skill - 1', () => {
      const result = resourcesController.findSkills();
      expect(result).toStrictEqual(mockSkill);
      expect(jest.spyOn(resourcesService, 'findResources')).toBeCalledTimes(1);
    });

    it('should return skill - 2', () => {
      const result = resourcesController.findSkillByClassName('');
      expect(result).toStrictEqual(mockSkill);
      expect(
        jest.spyOn(resourcesService, 'findSkillByClassName'),
      ).toBeCalledTimes(1);
    });
  });

  describe('POST', () => {
    it('should return class', () => {
      const result = resourcesController.createClass(mockClass);
      expect(result).toStrictEqual(mockClass);
      expect(jest.spyOn(resourcesService, 'createResource')).toBeCalledTimes(1);
    });

    it('should return engrave', () => {
      const result = resourcesController.createEngrave(mockEngrave);
      expect(result).toStrictEqual(mockEngrave);
      expect(jest.spyOn(resourcesService, 'createResource')).toBeCalledTimes(1);
    });

    it('should return reward', () => {
      const result = resourcesController.createReward(mockReward);
      expect(result).toStrictEqual(mockReward);
      expect(jest.spyOn(resourcesService, 'createResource')).toBeCalledTimes(1);
    });

    it('should return skill', () => {
      const result = resourcesController.createSkill(mockSkill);
      expect(result).toStrictEqual(mockSkill);
      expect(jest.spyOn(resourcesService, 'createResource')).toBeCalledTimes(1);
    });
  });

  describe('PUT', () => {
    it('should return class', () => {
      const result = resourcesController.replaceClass(mockClass);
      expect(result).toStrictEqual(mockClass);
      expect(jest.spyOn(resourcesService, 'replaceResource')).toBeCalledTimes(
        1,
      );
    });

    it('should return engrave', () => {
      const result = resourcesController.replaceEngrave(mockEngrave);
      expect(result).toStrictEqual(mockEngrave);
      expect(jest.spyOn(resourcesService, 'replaceResource')).toBeCalledTimes(
        1,
      );
    });

    it('should return reward', () => {
      const result = resourcesController.replaceReward(mockReward);
      expect(result).toStrictEqual(mockReward);
      expect(jest.spyOn(resourcesService, 'replaceResource')).toBeCalledTimes(
        1,
      );
    });

    it('should return skill', () => {
      const result = resourcesController.replaceSkill(mockSkill);
      expect(result).toStrictEqual(mockSkill);
      expect(jest.spyOn(resourcesService, 'replaceResource')).toBeCalledTimes(
        1,
      );
    });
  });
});
