import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { SetSetting } from './schemas/set-setting.schema';
import { Model } from 'mongoose';

@Injectable()
export class SetSettingsService {
  constructor(
    @InjectModel(SetSetting.name)
    private readonly setSettingModel: Model<SetSetting>,
  ) {}

  async findSetSettingsByClassName(className: string) {
    return await this.setSettingModel.find({ className });
  }

  async createSetSetting(setSetting: SetSetting) {
    return await this.setSettingModel.findOneAndUpdate(
      { characterName: setSetting.characterName },
      setSetting,
      { upsert: true, new: true },
    );
  }

  async deleteSetSetting(characterName: string) {
    return await this.setSettingModel.deleteOne({ characterName });
  }
}
