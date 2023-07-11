import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AbilitySetting } from './schemas/ability-setting.schema';
import { Model } from 'mongoose';
import { ProfileStat } from 'src/lostark/characters/interfaces/character-profile.interface';
import { StatisticAbilityDto } from './dto/statistic-ability.dto';

@Injectable()
export class StatisticAbilityService {
  constructor(
    @InjectModel(AbilitySetting.name)
    private readonly abilitySettingModel: Model<AbilitySetting>,
  ) {}

  async find(): Promise<AbilitySetting[]> {
    return await this.abilitySettingModel.find();
  }

  async findByClassEngrave(classEngrave: string): Promise<AbilitySetting[]> {
    return await this.abilitySettingModel.find({ classEngrave });
  }

  async upsert(abilitySetting: AbilitySetting): Promise<AbilitySetting> {
    return await this.abilitySettingModel.findOneAndUpdate(
      { characterName: abilitySetting.characterName },
      abilitySetting,
      { upsert: true, new: true },
    );
  }

  async deleteByCharacterName(characterName: string): Promise<number> {
    return (await this.abilitySettingModel.deleteOne({ characterName }))
      .deletedCount;
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

  async getStatisticAbility(
    classEngrave: string,
  ): Promise<StatisticAbilityDto> {
    const abilityCountMap = new Map();
    const datas =
      classEngrave === null
        ? await this.find()
        : await this.findByClassEngrave(classEngrave);

    datas.forEach((abilitySetting) => {
      if (abilityCountMap.has(abilitySetting.ability))
        abilityCountMap.set(
          abilitySetting.ability,
          abilityCountMap.get(abilitySetting.ability) + 1,
        );
      else abilityCountMap.set(abilitySetting.ability, 1);
    });

    const statisticAbility: StatisticAbilityDto = {
      count: datas.length,
      abilityCounts: [],
    };

    abilityCountMap.forEach((count, ability, _) => {
      statisticAbility.abilityCounts.push({ ability, count });
    });

    return statisticAbility;
  }
}
