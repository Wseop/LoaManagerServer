import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Class } from './schemas/class.schema';
import { Engrave } from './schemas/engrave.schema';
import { Reward } from './schemas/reward.schema';
import { Skill } from './schemas/skill.schema';
import { CreateClassDto } from './dto/create-class.dto';
import { CreateEngraveDto } from './dto/create-engrave.dto';
import { CreateRewardDto } from './dto/create-reward.dto';
import { CreateSkillDto } from './dto/create-skill.dto';
import { ResourceCategory } from './enums/resource-category.enum';

@Injectable()
export class ResourcesService {
  constructor(
    @InjectModel(Class.name) private readonly classModel: Model<Class>,
    @InjectModel(Engrave.name) private readonly engraveModel: Model<Engrave>,
    @InjectModel(Reward.name) private readonly rewardModel: Model<Reward>,
    @InjectModel(Skill.name) private readonly skillModel: Model<Skill>,
  ) {}

  async findResources(category: ResourceCategory) {
    switch (category) {
      case ResourceCategory.Class:
        return await this.classModel.find();
      case ResourceCategory.Engrave:
        return await this.engraveModel.find();
      case ResourceCategory.Reward:
        return await this.rewardModel.find();
      case ResourceCategory.Skill:
        return await this.skillModel.find();
      default:
        return null;
    }
  }

  async findRewardByContent(content: string) {
    return await this.rewardModel.findOne({ content });
  }

  async findSkillByClass(className: string) {
    return await this.skillModel.findOne({ className });
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
        return await this.classModel.create(createResourceDto);
      case ResourceCategory.Engrave:
        return await this.engraveModel.create(createResourceDto);
      case ResourceCategory.Reward:
        return await this.rewardModel.create(createResourceDto);
      case ResourceCategory.Skill:
        return await this.skillModel.create(createResourceDto);
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
    let replaceResult;

    // replace
    if (category === ResourceCategory.Class) {
      replaceResult = await this.classModel.replaceOne(
        { parent: (replaceResourceDto as CreateClassDto).parent },
        replaceResourceDto,
      );
    } else if (category === ResourceCategory.Engrave) {
      replaceResult = await this.engraveModel.replaceOne(
        { engraveName: (replaceResourceDto as CreateEngraveDto).engraveName },
        replaceResourceDto,
      );
    } else if (category === ResourceCategory.Reward) {
      replaceResult = await this.rewardModel.replaceOne(
        { content: (replaceResourceDto as CreateRewardDto).content },
        replaceResourceDto,
      );
    } else if (category === ResourceCategory.Skill) {
      replaceResult = await this.skillModel.replaceOne(
        { className: (replaceResourceDto as CreateSkillDto).className },
        replaceResourceDto,
      );
    } else {
      return null;
    }

    // replace 결과 체크 및 결과 반환
    if (replaceResult.matchedCount === 0) {
      return null;
    } else {
      if (category === ResourceCategory.Class) {
        return await this.classModel.findOne({
          parent: (replaceResourceDto as CreateClassDto).parent,
        });
      } else if (category === ResourceCategory.Engrave) {
        return await this.engraveModel.findOne({
          engraveName: (replaceResourceDto as CreateEngraveDto).engraveName,
        });
      } else if (category === ResourceCategory.Reward) {
        return await this.rewardModel.findOne({
          content: (replaceResourceDto as CreateRewardDto).content,
        });
      } else if (category === ResourceCategory.Skill) {
        return await this.skillModel.findOne({
          className: (replaceResourceDto as CreateSkillDto).className,
        });
      } else {
        return null;
      }
    }
  }
}
