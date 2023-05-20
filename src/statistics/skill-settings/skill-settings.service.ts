import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SkillSetting } from './schemas/skill-setting.schema';
import { CreateSkillSettingDto } from './dto/create-skill-setting.dto';

@Injectable()
export class SkillSettingsService {
  constructor(
    @InjectModel(SkillSetting.name)
    private readonly statsSkillModel: Model<SkillSetting>,
  ) {}

  async findSkillSettings() {
    return await this.statsSkillModel.find();
  }

  async findSkillSettingByClassName(className: string) {
    return await this.statsSkillModel.find({ className });
  }

  async createSkillSetting(createSkillSettingDto: CreateSkillSettingDto) {
    return await this.statsSkillModel.findOneAndUpdate(
      { characterName: createSkillSettingDto.characterName },
      createSkillSettingDto,
      { upsert: true, new: true },
    );
  }
}
