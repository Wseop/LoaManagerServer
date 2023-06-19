import { Injectable } from '@nestjs/common';
import { ClassService } from './class/class.service';
import { EngraveService } from './engrave/engrave.service';
import { RewardService } from './reward/reward.service';
import { SkillService } from './skill/skill.service';
import { ResourceCategory } from './enums/resource-category.enum';
import { CreateClassDto } from './class/dto/create-class.dto';
import { CreateEngraveDto } from './engrave/dto/create-engrave.dto';
import { CreateRewardDto } from './reward/dto/create-reward.dto';
import { CreateSkillDto } from './skill/dto/create-skill.dto';
import { RewardDto } from './reward/dto/reward.dto';
import { SkillDto } from './skill/dto/skill.dto';

@Injectable()
export class ResourcesService {
  constructor(
    private readonly classService: ClassService,
    private readonly engraveService: EngraveService,
    private readonly rewardService: RewardService,
    private readonly skillService: SkillService,
  ) {}

  async findResources(category: ResourceCategory) {
    switch (category) {
      case ResourceCategory.Class:
        return await this.classService.findClasses();
      case ResourceCategory.Engrave:
        return await this.engraveService.findEngraves();
      case ResourceCategory.Reward:
        return await this.rewardService.findRewards();
      case ResourceCategory.Skill:
        return await this.skillService.findSkills();
      default:
        return null;
    }
  }

  async findRewardByContent(content: string): Promise<RewardDto> {
    return await this.rewardService.findRewardByContent(content);
  }

  async findSkillByClassName(className: string): Promise<SkillDto> {
    return await this.skillService.findSkillByClassName(className);
  }

  async createResource(
    category: ResourceCategory,
    createResourceDto:
      | CreateClassDto
      | CreateEngraveDto
      | CreateRewardDto
      | CreateSkillDto,
  ) {
    switch (category) {
      case ResourceCategory.Class:
        return await this.classService.createClass(
          createResourceDto as CreateClassDto,
        );
      case ResourceCategory.Engrave:
        return await this.engraveService.createEngrave(
          createResourceDto as CreateEngraveDto,
        );
      case ResourceCategory.Reward:
        return await this.rewardService.createReward(
          createResourceDto as CreateRewardDto,
        );
      case ResourceCategory.Skill:
        return await this.skillService.createSkill(
          createResourceDto as CreateSkillDto,
        );
      default:
        return null;
    }
  }

  async replaceResource(
    category: ResourceCategory,
    replaceResourceDto:
      | CreateClassDto
      | CreateEngraveDto
      | CreateRewardDto
      | CreateSkillDto,
  ) {
    switch (category) {
      case ResourceCategory.Class:
        return await this.classService.replaceClass(
          replaceResourceDto as CreateClassDto,
        );
      case ResourceCategory.Engrave:
        return await this.engraveService.replaceEngrave(
          replaceResourceDto as CreateEngraveDto,
        );
      case ResourceCategory.Reward:
        return await this.rewardService.replaceReward(
          replaceResourceDto as CreateRewardDto,
        );
      case ResourceCategory.Skill:
        return await this.skillService.replaceSkill(
          replaceResourceDto as CreateSkillDto,
        );
      default:
        return null;
    }
  }
}
