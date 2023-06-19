import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AbilitySetting } from './schemas/ability-setting.schema';
import { Model } from 'mongoose';
import { ProfileStat } from 'src/lostark/characters/interfaces/character-profile.interface';

@Injectable()
export class AbilitySettingsService {
  constructor(
    @InjectModel(AbilitySetting.name)
    private readonly abilitySettingModel: Model<AbilitySetting>,
  ) {}

  async findAbilitySettings(className: string): Promise<AbilitySetting[]> {
    if (className) return await this.abilitySettingModel.find({ className });
    else return await this.abilitySettingModel.find();
  }

  async upsertAbilitySetting(
    abilitySetting: AbilitySetting,
  ): Promise<AbilitySetting> {
    return await this.abilitySettingModel.findOneAndUpdate(
      { characterName: abilitySetting.characterName },
      abilitySetting,
      { upsert: true, new: true },
    );
  }

  async deleteAbilitySetting(characterName: string) {
    return await this.abilitySettingModel.deleteOne({ characterName });
  }

  parseMainAbilities(stats: ProfileStat): string {
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
