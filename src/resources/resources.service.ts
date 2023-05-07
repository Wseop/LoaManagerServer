import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Class } from './schemas/class.schema';
import { Engrave } from './schemas/engrave.schema';
import { Reward } from './schemas/reward.schema';
import { Skill } from './schemas/skill.schema';
import { ClassDto } from './dto/class.dto';
import { EngraveDto } from './dto/engrave.dto';
import { RewardDto } from './dto/reward.dto';
import { SkillDto } from './dto/skill.dto';

@Injectable()
export class ResourcesService {
  constructor(
    @InjectModel(Class.name) private readonly classModel: Model<Class>,
    @InjectModel(Engrave.name) private readonly engraveModel: Model<Engrave>,
    @InjectModel(Reward.name) private readonly rewardModel: Model<Reward>,
    @InjectModel(Skill.name) private readonly skillModel: Model<Skill>,
  ) {}

  // Class
  async findAllClasses() {
    return await this.classModel.find();
  }

  async createClass(classDto: ClassDto) {
    return await this.classModel.create(classDto);
  }

  async replaceClass(classDto: ClassDto) {
    const result = await this.classModel.replaceOne(
      { parent: classDto.parent },
      classDto,
    );

    if (result.matchedCount !== 0) {
      return await this.classModel.findOne({ parent: classDto.parent });
    } else {
      throw new BadRequestException();
    }
  }

  // Engrave
  async findAllEngraves() {
    return await this.engraveModel.find();
  }

  async createEngrave(engraveDto: EngraveDto) {
    return await this.engraveModel.create(engraveDto);
  }

  // Reward
  async findRewardByContent(content: string) {
    return await this.rewardModel.find({ content });
  }

  async createReward(rewardDto: RewardDto) {
    return await this.rewardModel.create(rewardDto);
  }

  async replaceReward(rewardDto: RewardDto) {
    const result = await this.rewardModel.replaceOne(
      { content: rewardDto.content },
      rewardDto,
    );

    if (result.matchedCount !== 0) {
      return await this.rewardModel.findOne({ content: rewardDto.content });
    } else {
      throw new BadRequestException();
    }
  }

  // Skill
  async findSkillByClass(className: string) {
    return await this.skillModel.find({ className });
  }

  async createSkill(skillDto: SkillDto) {
    return await this.skillModel.create(skillDto);
  }

  async replaceSkill(skillDto: SkillDto) {
    const result = await this.skillModel.replaceOne(
      { className: skillDto.className },
      skillDto,
    );

    if (result.matchedCount !== 0) {
      return await this.skillModel.findOne({ className: skillDto.className });
    } else {
      throw new BadRequestException();
    }
  }
}
