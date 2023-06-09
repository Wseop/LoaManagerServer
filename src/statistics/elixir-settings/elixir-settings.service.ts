import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ElixirSetting } from './schemas/elixir-setting.schema';
import { Model } from 'mongoose';
import { CharacterEquipment } from 'src/lostark/characters/dto/characterInfo.dto';

@Injectable()
export class ElixirSettingsService {
  constructor(
    @InjectModel(ElixirSetting.name)
    private readonly elixirSettingModel: Model<ElixirSetting>,
  ) {}

  async findElixirSettingsByClassName(className: string) {
    return await this.elixirSettingModel.find({ className });
  }

  async upsertElixirSetting(elixirSetting: ElixirSetting) {
    return await this.elixirSettingModel.findOneAndUpdate(
      { characterName: elixirSetting.characterName },
      elixirSetting,
      { upsert: true, new: true },
    );
  }

  async deleteElixirSetting(characterName: string) {
    return await this.elixirSettingModel.deleteOne({ characterName });
  }

  parseElixir(equipments: { [equipment: string]: CharacterEquipment }) {
    let elixirLevelSum = 0;
    let elixirHead = '질서';
    let elixirHand = '혼돈';

    for (const equipment in equipments) {
      if (
        equipment === '투구' ||
        equipment === '상의' ||
        equipment === '하의' ||
        equipment === '장갑' ||
        equipment === '어깨'
      ) {
        const elixirs = equipments[equipment].elixirs;

        if (elixirs) {
          for (const elixir in elixirs) {
            if (elixir.includes('질서')) {
              elixirHead = elixir.substring(0, elixir.indexOf('(') - 1);
            } else if (elixir.includes('혼돈')) {
              elixirHand = elixir.substring(0, elixir.indexOf('(') - 1);
            }

            elixirLevelSum += elixirs[elixir];
          }
        }
      }
    }

    if (elixirHead === elixirHand && elixirLevelSum >= 35) {
      return elixirHead;
    } else {
      return null;
    }
  }
}
