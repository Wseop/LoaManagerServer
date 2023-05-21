import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ArmorySetting } from './schemas/armory-setting.schema';
import { CreateArmorySettingDto } from './dto/create-armory-setting.dto';

@Injectable()
export class ArmorySettingsService {
  constructor(
    @InjectModel(ArmorySetting.name)
    private readonly armorySettingModel: Model<ArmorySetting>,
  ) {}

  async findArmorySettings() {
    return await this.armorySettingModel.find();
  }

  async findArmorySettingByClassName(className: string) {
    return await this.armorySettingModel.find({ className });
  }

  async createArmorySetting(createArmorySettingDto: CreateArmorySettingDto) {
    return await this.armorySettingModel.findOneAndUpdate(
      {
        characterName: createArmorySettingDto.characterName,
      },
      createArmorySettingDto,
      { upsert: true, new: true },
    );
  }
}
