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

  async upsertAbilitySetting(abilitySetting: AbilitySetting) {
    return await this.abilitySettingModel.findOneAndUpdate(
      { characterName: abilitySetting.characterName },
      abilitySetting,
      { upsert: true, new: true },
    );
  }

  async deleteAbilitySetting(characterName: string) {
    return await this.abilitySettingModel.deleteOne({ characterName });
  }

  parseMainAbilities(stats: { [stat: string]: number }) {
    const keys = ['치명', '특화', '신속', '제압', '인내', '숙련'];
    const abilities: { ability: string; value: number }[] = [];
    let result: string = '';

    for (const key of keys) {
      if (stats[key] >= 200) {
        abilities.push({ ability: key, value: stats[key] });
      }
    }

    abilities.sort((a, b) => {
      return b.value - a.value;
    });

    for (const ability of abilities) {
      result += ability.ability[0];
    }

    return result;
  }
}
