import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AbilitySetting } from './schemas/ability-settings.schema';
import { Model } from 'mongoose';
import { ProfileStat } from 'src/lostark/characters/interfaces/character-profile.interface';
import { StatisticAbilityDto } from './dto/statistic-ability.dto';
import { EngraveService } from 'src/resources/engrave/engrave.service';

@Injectable()
export class StatisticAbilityService {
  constructor(
    @InjectModel(AbilitySetting.name)
    private readonly abilitySettingModel: Model<AbilitySetting>,
    private readonly engraveService: EngraveService,
  ) {}

  async findAbilitySettings(classEngrave: string): Promise<AbilitySetting[]> {
    if (classEngrave)
      return await this.abilitySettingModel.find({ classEngrave });
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

  async parseMainAbilities(stats: ProfileStat): Promise<string> {
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

  async getStatisticsAbility(
    classEngrave: string,
  ): Promise<StatisticAbilityDto> {
    const abilityCountMap = new Map();

    (await this.findAbilitySettings(classEngrave)).forEach((abilitySetting) => {
      if (abilityCountMap.has(abilitySetting.ability))
        abilityCountMap.set(
          abilitySetting.ability,
          abilityCountMap.get(abilitySetting.ability) + 1,
        );
      else abilityCountMap.set(abilitySetting.ability, 1);
    });

    const statisticAbility: StatisticAbilityDto = {
      count: 0,
      abilityCounts: [],
    };

    abilityCountMap.forEach((count, ability, _) => {
      statisticAbility.count += count;
      statisticAbility.abilityCounts.push({ ability, count });
    });

    statisticAbility.abilityCounts.sort((a, b) => b.count - a.count);

    return statisticAbility;
  }
}
