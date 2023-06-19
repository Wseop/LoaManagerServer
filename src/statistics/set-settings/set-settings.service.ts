import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { SetSetting } from './schemas/set-setting.schema';
import { Model } from 'mongoose';
import { CharacterEquipment } from 'src/lostark/characters/interfaces/character-equipment.interface';

@Injectable()
export class SetSettingsService {
  constructor(
    @InjectModel(SetSetting.name)
    private readonly setSettingModel: Model<SetSetting>,
  ) {}

  async findSetSettings(className: string): Promise<SetSetting[]> {
    if (className) return await this.setSettingModel.find({ className });
    else return await this.setSettingModel.find();
  }

  async upsertSetSetting(setSetting: SetSetting): Promise<SetSetting> {
    return await this.setSettingModel.findOneAndUpdate(
      { characterName: setSetting.characterName },
      setSetting,
      { upsert: true, new: true },
    );
  }

  async deleteSetSetting(characterName: string) {
    return await this.setSettingModel.deleteOne({ characterName });
  }

  parseSet(equipments: CharacterEquipment[]): string {
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

    for (const equipment of equipments) {
      if (
        equipment.type === '무기' ||
        equipment.type === '투구' ||
        equipment.type === '상의' ||
        equipment.type === '하의' ||
        equipment.type === '장갑' ||
        equipment.type === '어깨'
      ) {
        itemSetCounts[itemSetNames.indexOf(equipment.itemSet.setName)]++;
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
