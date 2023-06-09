import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Skill } from './schemas/skill.schema';
import { Model } from 'mongoose';
import { CreateSkillDto } from './dto/create-skill.dto';
import { SkillDto } from './dto/skill.dto';

@Injectable()
export class SkillService {
  constructor(
    @InjectModel(Skill.name) private readonly skillModel: Model<Skill>,
  ) {}

  async find(): Promise<SkillDto[]> {
    return await this.skillModel.find({}, { _id: 0, __v: 0 });
  }

  async findOneByClassName(className: string): Promise<SkillDto> {
    return await this.skillModel.findOne({ className }, { _id: 0, __v: 0 });
  }

  async create(createSkillDto: CreateSkillDto): Promise<SkillDto> {
    const result = await this.skillModel.create(createSkillDto);

    return {
      className: result.className,
      skills: result.skills,
    };
  }

  async replaceOne(replaceSkillDto: CreateSkillDto): Promise<SkillDto> {
    const replaceResult = await this.skillModel.replaceOne(
      {
        className: replaceSkillDto.className,
      },
      replaceSkillDto,
    );

    if (replaceResult.matchedCount === 0) {
      return null;
    } else {
      return await this.skillModel.findOne(
        {
          className: replaceSkillDto.className,
        },
        { _id: 0, __v: 0 },
      );
    }
  }
}
