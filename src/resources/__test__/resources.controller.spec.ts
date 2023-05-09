import { Test, TestingModule } from '@nestjs/testing';
import { ResourcesController } from '../resources.controller';
import { ResourcesService } from '../resources.service';
import { BadRequestException } from '@nestjs/common';
import { Class } from '../schemas/class.schema';
import { Engrave } from '../schemas/engrave.schema';
import { Reward } from '../schemas/reward.schema';
import { Skill } from '../schemas/skill.schema';

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

class MockResourcesService {
  findResources = jest.fn((category) => {
    if (category === 'class') {
      return mockClass;
    } else if (category === 'engrave') {
      return mockEngrave;
    } else if (category === 'reward') {
      return mockReward;
    } else if (category === 'skill') {
      return mockSkill;
    }
  });
  findRewardByContent = jest.fn().mockReturnValue(mockReward);
  findSkillByClass = jest.fn().mockReturnValue(mockSkill);
  createResource = jest.fn((category, mockResource) => mockResource);
  replaceClass = jest.fn().mockReturnValue(mockClass);
  replaceReward = jest.fn().mockReturnValue(mockReward);
  replaceSkill = jest.fn().mockReturnValue(mockSkill);
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

  describe('findResources()', () => {
    it('should return resource', () => {
      const categories = ['class', 'engrave', 'reward', 'skill'];
      const expects = [mockClass, mockEngrave, mockReward, mockSkill];

      for (let i = 0; i < categories.length; i++) {
        const result = resourcesController.findResources(categories[i]);
        expect(result).toStrictEqual(expects[i]);
      }

      expect(jest.spyOn(resourcesService, 'findResources')).toBeCalledTimes(
        categories.length,
      );
    });
    it('should throw BadRequestException', () => {
      try {
        resourcesController.findResources('invalid category');
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
      } finally {
        expect(jest.spyOn(resourcesService, 'findResources')).toBeCalledTimes(
          0,
        );
      }
    });
  });

  describe('findResourcesByFilter()', () => {
    it('should return a reward', () => {
      const result = resourcesController.findResourcesByFilter(
        'reward',
        'filter',
      );

      expect(result).toStrictEqual(mockReward);
      expect(
        jest.spyOn(resourcesService, 'findRewardByContent'),
      ).toBeCalledTimes(1);
    });
    it('should return a skill', () => {
      const result = resourcesController.findResourcesByFilter(
        'skill',
        'filter',
      );

      expect(result).toStrictEqual(mockSkill);
      expect(jest.spyOn(resourcesService, 'findSkillByClass')).toBeCalledTimes(
        1,
      );
    });
    it('should throw BadRequestException', () => {
      try {
        resourcesController.findResourcesByFilter('invalid category', 'filter');
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
      } finally {
        expect(
          jest.spyOn(resourcesService, 'findRewardByContent'),
        ).toBeCalledTimes(0);
        expect(
          jest.spyOn(resourcesService, 'findSkillByClass'),
        ).toBeCalledTimes(0);
      }
    });
  });

  describe('createClass()', () => {
    it('should return a class', () => {
      const result = resourcesController.createClass(mockClass);

      expect(result).toStrictEqual(mockClass);
      expect(jest.spyOn(resourcesService, 'createResource')).toBeCalledTimes(1);
    });
  });

  describe('replaceClass()', () => {
    it('should return a class', () => {
      const result = resourcesController.replaceClass(mockClass);

      expect(result).toStrictEqual(mockClass);
      expect(jest.spyOn(resourcesService, 'replaceClass')).toBeCalledTimes(1);
    });
  });

  describe('createEngrave()', () => {
    it('should return an engrave', () => {
      const result = resourcesController.createEngrave(mockEngrave);

      expect(result).toStrictEqual(mockEngrave);
      expect(jest.spyOn(resourcesService, 'createResource')).toBeCalledTimes(1);
    });
  });

  describe('createReward()', () => {
    it('should return a reward', () => {
      const result = resourcesController.createReward(mockReward);

      expect(result).toStrictEqual(mockReward);
      expect(jest.spyOn(resourcesService, 'createResource')).toBeCalledTimes(1);
    });
  });

  describe('replaceReward()', () => {
    it('should return a reward', () => {
      const result = resourcesController.replaceReward(mockReward);

      expect(result).toStrictEqual(mockReward);
      expect(jest.spyOn(resourcesService, 'replaceReward')).toBeCalledTimes(1);
    });
  });

  describe('createSkill()', () => {
    it('should return a skill', () => {
      const result = resourcesController.createSkill(mockSkill);

      expect(result).toStrictEqual(mockSkill);
      expect(jest.spyOn(resourcesService, 'createResource')).toBeCalledTimes(1);
    });
  });

  describe('replaceSkill()', () => {
    it('should return a skill', () => {
      const result = resourcesController.replaceSkill(mockSkill);

      expect(result).toStrictEqual(mockSkill);
      expect(jest.spyOn(resourcesService, 'replaceSkill')).toBeCalledTimes(1);
    });
  });
});
