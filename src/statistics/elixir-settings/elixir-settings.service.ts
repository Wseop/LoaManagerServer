import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ElixirSetting } from './schemas/elixir-setting.schema';
import { Model } from 'mongoose';

@Injectable()
export class ElixirSettingsService {
  constructor(
    @InjectModel(ElixirSetting.name)
    private readonly elixirSettingModel: Model<ElixirSetting>,
  ) {}

  async findElixirSettingsByClassName(className: string) {
    return await this.elixirSettingModel.find({ className });
  }

  async createElixirSetting(elixirSetting: ElixirSetting) {
    return await this.elixirSettingModel.findOneAndUpdate(
      { characterName: elixirSetting.characterName },
      elixirSetting,
      { upsert: true, new: true },
    );
  }

  async deleteElixirSetting(characterName: string) {
    return await this.elixirSettingModel.deleteOne({ characterName });
  }
}
