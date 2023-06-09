import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { SetSetting } from './schemas/set-setting.schema';
import { Model } from 'mongoose';
import { CharacterEquipment } from 'src/lostark/characters/dto/characterInfo.dto';

@Injectable()
export class SetSettingsService {
  constructor(
    @InjectModel(SetSetting.name)
    private readonly setSettingModel: Model<SetSetting>,
  ) {}

  async findSetSettingsByClassName(className: string) {
    return await this.setSettingModel.find({ className });
  }

  async upsertSetSetting(setSetting: SetSetting) {
    return await this.setSettingModel.findOneAndUpdate(
      { characterName: setSetting.characterName },
      setSetting,
      { upsert: true, new: true },
    );
  }

  async deleteSetSetting(characterName: string) {
    return await this.setSettingModel.deleteOne({ characterName });
  }

  parseSet(equipments: { [equipment: string]: CharacterEquipment }) {
    const itemSetNames = [
      '악몽',
      '사멸',
      '지배',
      '환각',
      '구원',
      '갈망',
      '배신',
      '매혹',
      '파괴',
    ];
    const itemSetCounts = Array.from({ length: itemSetNames.length }, () => 0);

    for (const equipment in equipments) {
      if (
        equipment === '무기' ||
        equipment === '투구' ||
        equipment === '상의' ||
        equipment === '하의' ||
        equipment === '장갑' ||
        equipment === '어깨'
      ) {
        itemSetCounts[
          itemSetNames.indexOf(equipments[equipment].itemSet.setName)
        ]++;
      }
    }

    let result = '';

    itemSetCounts.forEach((count, i) => {
      if (count > 0) {
        result += `${count}${itemSetNames[i]}`;
      }
    });

    return result;
  }
}
