import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ArmoryEngrave, ArmorySetting } from './schemas/armory-setting.schema';
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
    // engraves 정렬
    // 1. level 기준 내림차순
    // 2. code 기준 오름차순
    createArmorySettingDto.engraves.sort(
      (a: ArmoryEngrave, b: ArmoryEngrave) => {
        if (a.level === b.level) {
          return a.code - b.code;
        } else {
          return b.level - a.level;
        }
      },
    );

    return await this.armorySettingModel.findOneAndUpdate(
      {
        characterName: createArmorySettingDto.characterName,
      },
      createArmorySettingDto,
      { upsert: true, new: true },
    );
  }
}
