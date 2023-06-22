import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SkillSetting, SkillUsage } from './schemas/skill-setting.schema';
import { CharacterSkill } from 'src/lostark/characters/interfaces/character-skill.interface';
import { StatisticSkillDto } from './dto/statistic-skill.dto';
import {
  RuneCount,
  SkillLevelCount,
  TripodCount,
} from './interfaces/skill-count.interface';

@Injectable()
export class StatisticSkillService {
  constructor(
    @InjectModel(SkillSetting.name)
    private readonly skillSettingModel: Model<SkillSetting>,
  ) {}

  async find(): Promise<SkillSetting[]> {
    return await this.skillSettingModel.find();
  }

  async findByClassEngrave(classEngrave: string): Promise<SkillSetting[]> {
    return await this.skillSettingModel.find({ classEngrave });
  }

  async upsert(skillSetting: SkillSetting): Promise<SkillSetting> {
    return await this.skillSettingModel.findOneAndUpdate(
      { characterName: skillSetting.characterName },
      skillSetting,
      { upsert: true, new: true },
    );
  }

  async deleteByCharacterName(characterName: string): Promise<number> {
    return (await this.skillSettingModel.deleteOne({ characterName }))
      .deletedCount;
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

  async getStatisticSkill(classEngrave: string): Promise<StatisticSkillDto> {
    const skillCountMap = new Map();
    const datas = await this.findByClassEngrave(classEngrave);

    datas.forEach((skillSetting) => {
      skillSetting.skillUsages.forEach((skillUsage) => {
        if (!skillCountMap.has(skillUsage.skillName)) {
          skillCountMap.set(skillUsage.skillName, {
            count: 0,
            skillName: skillUsage.skillName,
            skillLevelCounts: [],
            tripodCounts: [],
            runeCounts: [],
          });
        }

        const skillCount = skillCountMap.get(skillUsage.skillName);
        skillCount.count++;

        // skill level
        const skillLevelCount = skillCount.skillLevelCounts.find(
          (element: SkillLevelCount) =>
            element.skillLevel === skillUsage.skillLevel,
        );
        if (skillLevelCount) skillLevelCount.count++;
        else
          skillCount.skillLevelCounts.push({
            count: 1,
            skillLevel: skillUsage.skillLevel,
          });

        // tripods
        skillUsage.tripodNames.forEach((tripodName) => {
          const tripodCount = skillCount.tripodCounts.find(
            (element: TripodCount) => element.tripodName === tripodName,
          );
          if (tripodCount) tripodCount.count++;
          else skillCount.tripodCounts.push({ count: 1, tripodName });
        });

        // rune
        if (skillUsage.runeName) {
          const runeCount = skillCount.runeCounts.find(
            (element: RuneCount) => element.runeName === skillUsage.runeName,
          );
          if (runeCount) runeCount.count++;
          else
            skillCount.runeCounts.push({
              count: 1,
              runeName: skillUsage.runeName,
            });
        }
      });
    });

    const statisticSkill: StatisticSkillDto = {
      count: datas.length,
      skillCounts: [],
    };

    skillCountMap.forEach((value, _, __) =>
      statisticSkill.skillCounts.push(value),
    );

    statisticSkill.skillCounts.sort((a, b) => b.count - a.count);

    return statisticSkill;
  }
}
