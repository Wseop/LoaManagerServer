import { Test, TestingModule } from '@nestjs/testing';
import { ResourcesController } from '../resources.controller';
import { ResourcesService } from '../resources.service';
import { BadRequestException } from '@nestjs/common';

const mockClass = {
  parent: 'parent',
  child: ['child'],
};

const mockEngrave = {
  code: 0,
  engraveName: 'engraveName',
  className: 'className',
  isPenalty: false,
};

const mockReward = {
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

const mockSkill = {
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
    return mockClass;
  });

  findRewardByContent = jest.fn((filiter) => {
    return mockReward;
  });

  findSkillByClass = jest.fn((filter) => {
    return mockSkill;
  });

  createResource = jest.fn((category, mockResource) => {
    return mockResource;
  });

  replaceClass = jest.fn((mockResource) => {
    return mockResource;
  });

  replaceReward = jest.fn((mockResource) => {
    return mockResource;
  });

  replaceSkill = jest.fn((mockResource) => {
    return mockResource;
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

  describe('findResources()', () => {
    it('should return mockResource', () => {
      const categories = ['class', 'engrave', 'reward', 'skill'];
      const spyFindResources = jest.spyOn(resourcesService, 'findResources');

      for (const category of categories) {
        const result = resourcesController.findResources(category);
        expect(result).toStrictEqual(mockClass);
      }

      expect(spyFindResources).toBeCalledTimes(categories.length);
    });

    it('should throw BadRequestException', () => {
      const spyFindResources = jest.spyOn(resourcesService, 'findResources');

      try {
        resourcesController.findResources('invalid category');
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
      } finally {
        expect(spyFindResources).toBeCalledTimes(0);
      }
    });
  });

  describe('findResourcesByFilter()', () => {
    it('should return mockReward', () => {
      const result = resourcesController.findResourcesByFilter(
        'reward',
        'filter',
      );
      const spyFindRewardByContent = jest.spyOn(
        resourcesService,
        'findRewardByContent',
      );

      expect(result).toStrictEqual(mockReward);
      expect(spyFindRewardByContent).toBeCalledTimes(1);
    });

    it('should return mockSkill', () => {
      const result = resourcesController.findResourcesByFilter(
        'skill',
        'filter',
      );
      const spyFindSkillByClass = jest.spyOn(
        resourcesService,
        'findSkillByClass',
      );

      expect(result).toStrictEqual(mockSkill);
      expect(spyFindSkillByClass).toBeCalledTimes(1);
    });

    it('should throw BadRequestException', () => {
      const spyFindRewardByContent = jest.spyOn(
        resourcesService,
        'findRewardByContent',
      );
      const spyFindSkillByClass = jest.spyOn(
        resourcesService,
        'findSkillByClass',
      );

      try {
        resourcesController.findResourcesByFilter('invalid category', 'filter');
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
      } finally {
        expect(spyFindRewardByContent).toBeCalledTimes(0);
        expect(spyFindSkillByClass).toBeCalledTimes(0);
      }
    });
  });

  describe('createClass()', () => {
    it('should return mockClass', () => {
      const result = resourcesController.createClass(mockClass);

      expect(result).toStrictEqual(mockClass);
      expect(jest.spyOn(resourcesService, 'createResource')).toBeCalledTimes(1);
    });
  });

  describe('replaceClass()', () => {
    it('should return mockClass', () => {
      const result = resourcesController.replaceClass(mockClass);

      expect(result).toStrictEqual(mockClass);
      expect(jest.spyOn(resourcesService, 'replaceClass')).toBeCalledTimes(1);
    });
  });

  describe('createEngrave()', () => {
    it('should return mockEngrave', () => {
      const result = resourcesController.createEngrave(mockEngrave);

      expect(result).toStrictEqual(mockEngrave);
      expect(jest.spyOn(resourcesService, 'createResource')).toBeCalledTimes(1);
    });
  });

  describe('createReward()', () => {
    it('should return mockReward', () => {
      const result = resourcesController.createReward(mockReward);

      expect(result).toStrictEqual(mockReward);
      expect(jest.spyOn(resourcesService, 'createResource')).toBeCalledTimes(1);
    });
  });

  describe('replaceReward()', () => {
    it('should return mockReward', () => {
      const result = resourcesController.replaceReward(mockReward);

      expect(result).toStrictEqual(mockReward);
      expect(jest.spyOn(resourcesService, 'replaceReward')).toBeCalledTimes(1);
    });
  });

  describe('createSkill()', () => {
    it('should return mockSkill', () => {
      const result = resourcesController.createSkill(mockSkill);

      expect(result).toStrictEqual(mockSkill);
      expect(jest.spyOn(resourcesService, 'createResource')).toBeCalledTimes(1);
    });
  });

  describe('replaceSkill()', () => {
    it('should return mockSkill', () => {
      const result = resourcesController.replaceSkill(mockSkill);

      expect(result).toStrictEqual(mockSkill);
      expect(jest.spyOn(resourcesService, 'replaceSkill')).toBeCalledTimes(1);
    });
  });
});
