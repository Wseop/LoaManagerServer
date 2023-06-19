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

  async findEngraveSettings(className: string): Promise<EngraveSetting[]> {
    if (className) return await this.engraveSettingModel.find({ className });
    else return await this.engraveSettingModel.find();
  }

  async upsertEngraveSetting(
    engraveSetting: EngraveSetting,
  ): Promise<EngraveSetting> {
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
