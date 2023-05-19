import { Test, TestingModule } from '@nestjs/testing';
import { ClassService } from '../class/class.service';
import { EngraveService } from '../engrave/engrave.service';
import { ResourcesService } from '../resources.service';
import { RewardService } from '../reward/reward.service';
import { SkillService } from '../skill/skill.service';
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

class MockClassService {
  findClasses = jest.fn().mockResolvedValue(mockClass);
  createClass = jest.fn().mockResolvedValue(mockClass);
  replaceClass = jest.fn().mockResolvedValue(mockClass);
}
class MockEngraveService {
  findEngraves = jest.fn().mockResolvedValue(mockEngrave);
  createEngrave = jest.fn().mockResolvedValue(mockEngrave);
  replaceEngrave = jest.fn().mockResolvedValue(mockEngrave);
}
class MockRewardService {
  findRewards = jest.fn().mockResolvedValue(mockReward);
  findRewardByContent = jest.fn().mockResolvedValue(mockReward);
  createReward = jest.fn().mockResolvedValue(mockReward);
  replaceReward = jest.fn().mockResolvedValue(mockReward);
}
class MockSkillService {
  findSkills = jest.fn().mockResolvedValue(mockSkill);
  findSkillByClassName = jest.fn().mockResolvedValue(mockSkill);
  createSkill = jest.fn().mockResolvedValue(mockSkill);
  replaceSkill = jest.fn().mockResolvedValue(mockSkill);
}

describe('Resources Service', () => {
  let resourcesService: ResourcesService;
  let classService: ClassService;
  let engraveService: EngraveService;
  let rewardService: RewardService;
  let skillService: SkillService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ResourcesService,
        {
          provide: ClassService,
          useClass: MockClassService,
        },
        {
          provide: EngraveService,
          useClass: MockEngraveService,
        },
        {
          provide: RewardService,
          useClass: MockRewardService,
        },
        {
          provide: SkillService,
          useClass: MockSkillService,
        },
      ],
    }).compile();

    resourcesService = module.get<ResourcesService>(ResourcesService);
    classService = module.get<ClassService>(ClassService);
    engraveService = module.get<EngraveService>(EngraveService);
    rewardService = module.get<RewardService>(RewardService);
    skillService = module.get<SkillService>(SkillService);
  });

  describe('findResource', () => {
    it('should return class', async () => {
      const result = await resourcesService.findResources(
        ResourceCategory.Class,
      );
      expect(result).toStrictEqual(mockClass);
      expect(jest.spyOn(classService, 'findClasses')).toBeCalledTimes(1);
    });

    it('should return engrave', async () => {
      const result = await resourcesService.findResources(
        ResourceCategory.Engrave,
      );
      expect(result).toStrictEqual(mockEngrave);
      expect(jest.spyOn(engraveService, 'findEngraves')).toBeCalledTimes(1);
    });

    it('should return reward', async () => {
      const result = await resourcesService.findResources(
        ResourceCategory.Reward,
      );
      expect(result).toStrictEqual(mockReward);
      expect(jest.spyOn(rewardService, 'findRewards')).toBeCalledTimes(1);
    });

    it('should return skill', async () => {
      const result = await resourcesService.findResources(
        ResourceCategory.Skill,
      );
      expect(result).toStrictEqual(mockSkill);
      expect(jest.spyOn(skillService, 'findSkills')).toBeCalledTimes(1);
    });

    it('should return null', async () => {
      const result = await resourcesService.findResources(
        'invalid category' as ResourceCategory,
      );
      expect(result).toBe(null);
    });
  });

  describe('findRewardByContent', () => {
    it('should return reward', async () => {
      const result = await resourcesService.findRewardByContent('');
      expect(result).toStrictEqual(mockReward);
      expect(jest.spyOn(rewardService, 'findRewardByContent')).toBeCalledTimes(
        1,
      );
    });
  });

  describe('findSkillByClassName', () => {
    it('should return skill', async () => {
      const result = await resourcesService.findSkillByClassName('');
      expect(result).toStrictEqual(mockSkill);
      expect(jest.spyOn(skillService, 'findSkillByClassName')).toBeCalledTimes(
        1,
      );
    });
  });

  describe('createResource', () => {
    it('should return class', async () => {
      const result = await resourcesService.createResource(
        ResourceCategory.Class,
        mockClass,
      );
      expect(result).toStrictEqual(mockClass);
      expect(jest.spyOn(classService, 'createClass')).toBeCalledTimes(1);
    });

    it('should return engrave', async () => {
      const result = await resourcesService.createResource(
        ResourceCategory.Engrave,
        mockEngrave,
      );
      expect(result).toStrictEqual(mockEngrave);
      expect(jest.spyOn(engraveService, 'createEngrave')).toBeCalledTimes(1);
    });

    it('should return reward', async () => {
      const result = await resourcesService.createResource(
        ResourceCategory.Reward,
        mockReward,
      );
      expect(result).toStrictEqual(mockReward);
      expect(jest.spyOn(rewardService, 'createReward')).toBeCalledTimes(1);
    });

    it('should return skill', async () => {
      const result = await resourcesService.createResource(
        ResourceCategory.Skill,
        mockSkill,
      );
      expect(result).toStrictEqual(mockSkill);
      expect(jest.spyOn(skillService, 'createSkill')).toBeCalledTimes(1);
    });

    it('should return null', async () => {
      const result = await resourcesService.createResource(
        'invalid category' as ResourceCategory,
        mockClass,
      );
      expect(result).toBe(null);
    });
  });

  describe('replaceResource', () => {
    it('should return class', async () => {
      const result = await resourcesService.replaceResource(
        ResourceCategory.Class,
        mockClass,
      );
      expect(result).toStrictEqual(mockClass);
      expect(jest.spyOn(classService, 'replaceClass')).toBeCalledTimes(1);
    });

    it('should return engrave', async () => {
      const result = await resourcesService.replaceResource(
        ResourceCategory.Engrave,
        mockEngrave,
      );
      expect(result).toStrictEqual(mockEngrave);
      expect(jest.spyOn(engraveService, 'replaceEngrave')).toBeCalledTimes(1);
    });

    it('should return reward', async () => {
      const result = await resourcesService.replaceResource(
        ResourceCategory.Reward,
        mockReward,
      );
      expect(result).toStrictEqual(mockReward);
      expect(jest.spyOn(rewardService, 'replaceReward')).toBeCalledTimes(1);
    });

    it('should return skill', async () => {
      const result = await resourcesService.replaceResource(
        ResourceCategory.Skill,
        mockSkill,
      );
      expect(result).toStrictEqual(mockSkill);
      expect(jest.spyOn(skillService, 'replaceSkill')).toBeCalledTimes(1);
    });

    it('should return null', async () => {
      const result = await resourcesService.replaceResource(
        'invalid category' as ResourceCategory,
        mockClass,
      );
      expect(result).toBe(null);
    });
  });
});
