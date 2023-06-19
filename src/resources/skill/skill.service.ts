import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Skill } from './schemas/skill.schema';
import { Model } from 'mongoose';
import { CreateSkillDto } from './dto/create-skill.dto';

@Injectable()
export class SkillService {
  constructor(
    @InjectModel(Skill.name) private readonly skillModel: Model<Skill>,
  ) {}

  async findSkills() {
    return await this.skillModel.find({}, { _id: 0 });
  }

  async findSkillByClassName(className: string) {
    return await this.skillModel.findOne({ className }, { _id: 0 });
  }

  async createSkill(createSkillDto: CreateSkillDto) {
    return await this.skillModel.create(createSkillDto);
  }

  async replaceSkill(replaceSkillDto: CreateSkillDto) {
    const replaceResult = await this.skillModel.replaceOne(
      {
        className: replaceSkillDto.className,
      },
      replaceSkillDto,
    );

    if (replaceResult.matchedCount === 0) {
      return null;
    } else {
      return await this.skillModel.findOne({
        className: replaceSkillDto.className,
      });
    }
  }
}
