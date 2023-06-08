import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AbilitySetting } from './schemas/ability-setting.schema';
import { Model } from 'mongoose';

@Injectable()
export class AbilitySettingsService {
  constructor(
    @InjectModel(AbilitySetting.name)
    private readonly abilitySettingModel: Model<AbilitySetting>,
  ) {}

  async findAbilitySettingsByClassName(className: string) {
    return await this.abilitySettingModel.find({ className });
  }

  async createAbilitySetting(abilitySetting: AbilitySetting) {
    return await this.abilitySettingModel.findOneAndUpdate(
      { characterName: abilitySetting.characterName },
      abilitySetting,
      { upsert: true, new: true },
    );
  }

  async deleteAbilitySetting(characterName: string) {
    return await this.abilitySettingModel.deleteOne({ characterName });
  }
}
