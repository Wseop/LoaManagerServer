import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { SkillSetting } from './schemas/skill-setting.schema';
import { FilterQuery, Model, ProjectionType } from 'mongoose';

@Injectable()
export class SkillSettingsService {
  constructor(
    @InjectModel(SkillSetting.name)
    private readonly skillSettingModel: Model<SkillSetting>,
  ) {}

  async find(
    filter?: FilterQuery<SkillSetting>,
    fields?: string[],
  ): Promise<SkillSetting[]> {
    const projection: ProjectionType<SkillSetting> = {
      _id: 0,
    };
    if (fields) {
      fields.forEach((field) => {
        projection[field] = 1;
      });
    }

    return await this.skillSettingModel.find(filter, projection);
  }

  async findOne(
    filter: FilterQuery<SkillSetting>,
    fields?: string[],
  ): Promise<SkillSetting> {
    const projection: ProjectionType<SkillSetting> = {
      _id: 0,
    };
    if (fields) {
      fields.forEach((field) => {
        projection[field] = 1;
      });
    }

    return await this.skillSettingModel.findOne(filter, projection);
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
}
