import { BadRequestException, Injectable } from '@nestjs/common';
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

@Injectable()
export class ResourcesService {
  constructor(
    @InjectModel(Class.name) private readonly classModel: Model<Class>,
    @InjectModel(Engrave.name) private readonly engraveModel: Model<Engrave>,
    @InjectModel(Reward.name) private readonly rewardModel: Model<Reward>,
    @InjectModel(Skill.name) private readonly skillModel: Model<Skill>,
  ) {}

  async findResources(category: string) {
    if (category === 'class') {
      return await this.classModel.find();
    } else if (category === 'engrave') {
      return await this.engraveModel.find();
    } else if (category === 'reward') {
      return await this.rewardModel.find();
    } else if (category === 'skill') {
      return await this.skillModel.find();
    }
  }

  async findRewardByContent(content: string) {
    return await this.rewardModel.findOne({ content });
  }

  async findSkillByClass(className: string) {
    return await this.skillModel.findOne({ className });
  }

  async createResource(category: string, createResourceDto) {
    if (category === 'class') {
      return await this.classModel.create(createResourceDto);
    } else if (category === 'engrave') {
      return await this.engraveModel.create(createResourceDto);
    } else if (category === 'reward') {
      return await this.rewardModel.create(createResourceDto);
    } else if (category === 'skill') {
      return await this.skillModel.create(createResourceDto);
    }
  }

  async replaceClass(createClassDto: CreateClassDto) {
    const result = await this.classModel.replaceOne(
      { parent: createClassDto.parent },
      createClassDto,
    );

    if (result.matchedCount !== 0) {
      return await this.classModel.findOne({ parent: createClassDto.parent });
    } else {
      throw new BadRequestException();
    }
  }

  async replaceReward(createRewardDto: CreateRewardDto) {
    const result = await this.rewardModel.replaceOne(
      { content: createRewardDto.content },
      createRewardDto,
    );

    if (result.matchedCount !== 0) {
      return await this.rewardModel.findOne({
        content: createRewardDto.content,
      });
    } else {
      throw new BadRequestException();
    }
  }

  async replaceSkill(createSkillDto: CreateSkillDto) {
    const result = await this.skillModel.replaceOne(
      { className: createSkillDto.className },
      createSkillDto,
    );

    if (result.matchedCount !== 0) {
      return await this.skillModel.findOne({
        className: createSkillDto.className,
      });
    } else {
      throw new BadRequestException();
    }
  }
}
