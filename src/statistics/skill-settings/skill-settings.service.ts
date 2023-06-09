import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SkillSetting, SkillUsage } from './schemas/skill-setting.schema';
import { CreateSkillSettingDto } from './dto/create-skill-setting.dto';
import { CharacterSkill } from 'src/lostark/characters/dto/characterInfo.dto';

@Injectable()
export class SkillSettingsService {
  constructor(
    @InjectModel(SkillSetting.name)
    private readonly statsSkillModel: Model<SkillSetting>,
  ) {}

  async findSkillSettings() {
    return await this.statsSkillModel.find();
  }

  async findSkillSettingsByClassName(className: string) {
    return await this.statsSkillModel.find({ className });
  }

  async upsertSkillSetting(createSkillSettingDto: CreateSkillSettingDto) {
    return await this.statsSkillModel.findOneAndUpdate(
      { characterName: createSkillSettingDto.characterName },
      createSkillSettingDto,
      { upsert: true, new: true },
    );
  }

  parseSkillUsage(skills: CharacterSkill[]) {
    const skillUsages = [];

    skills.forEach((skill) => {
      const skillUsage: SkillUsage = {
        skillName: skill?.skillName,
        skillLevel: skill?.skillLevel,
        tripodNames: [],
        runeName: skill?.rune?.runeName,
      };

      skill.tripods.forEach((tripod) => {
        skillUsage.tripodNames.push(tripod.tripodName);
      });

      skillUsages.push(skillUsage);
    });

    return skillUsages;
  }
}
