import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { EngraveSetting } from './schemas/engrave-setting.schema';
import { Model } from 'mongoose';

@Injectable()
export class EngraveSettingsService {
  constructor(
    @InjectModel(EngraveSetting.name)
    private readonly engraveSettingModel: Model<EngraveSetting>,
  ) {}

  async findEngraveSettingsByClassName(className: string) {
    return await this.engraveSettingModel.find({ className });
  }

  async createEngraveSetting(engraveSetting: EngraveSetting) {
    return await this.engraveSettingModel.findOneAndUpdate(
      { characterName: engraveSetting.characterName },
      engraveSetting,
      { upsert: true, new: true },
    );
  }

  async deleteEngraveSetting(characterName: string) {
    return await this.engraveSettingModel.deleteOne({ characterName });
  }
}
