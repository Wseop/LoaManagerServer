import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SkillSetting, SkillUsage } from './schemas/skill-setting.schema';
import { CreateSkillSettingDto } from './dto/create-skill-setting.dto';
import { CharacterSkill } from 'src/lostark/characters/interfaces/character-skill.interface';

@Injectable()
export class SkillSettingsService {
  constructor(
    @InjectModel(SkillSetting.name)
    private readonly skillSettingModel: Model<SkillSetting>,
  ) {}

  async findSkillSettings(className: string): Promise<SkillSetting[]> {
    if (className) return await this.skillSettingModel.find({ className });
    else return await this.skillSettingModel.find();
  }

  async upsertSkillSetting(
    createSkillSettingDto: CreateSkillSettingDto,
  ): Promise<SkillSetting> {
    return await this.skillSettingModel.findOneAndUpdate(
      { characterName: createSkillSettingDto.characterName },
      createSkillSettingDto,
      { upsert: true, new: true },
    );
  }

  parseSkillUsage(skills: CharacterSkill[]): SkillUsage[] {
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
