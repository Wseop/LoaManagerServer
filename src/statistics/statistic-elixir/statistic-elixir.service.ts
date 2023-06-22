import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ElixirSetting } from './schemas/elixir-setting.schema';
import { Model } from 'mongoose';
import { CharacterEquipment } from 'src/lostark/characters/interfaces/character-equipment.interface';
import { StatisticElixirDto } from './dto/statistic-elixir.dto';

@Injectable()
export class StatisticElixirService {
  constructor(
    @InjectModel(ElixirSetting.name)
    private readonly elixirSettingModel: Model<ElixirSetting>,
  ) {}

  async find(): Promise<ElixirSetting[]> {
    return await this.elixirSettingModel.find();
  }

  async findByClassEngrave(classEngrave: string): Promise<ElixirSetting[]> {
    return await this.elixirSettingModel.find({ classEngrave });
  }

  async upsert(elixirSetting: ElixirSetting): Promise<ElixirSetting> {
    return await this.elixirSettingModel.findOneAndUpdate(
      { characterName: elixirSetting.characterName },
      elixirSetting,
      { upsert: true, new: true },
    );
  }

  async deleteByCharacterName(characterName: string): Promise<number> {
    return (await this.elixirSettingModel.deleteOne({ characterName }))
      .deletedCount;
  }

  parseElixir(equipments: CharacterEquipment[]): string {
    let elixirLevelSum = 0;
    let elixirHead = '질서';
    let elixirHand = '혼돈';

    for (const equipment of equipments) {
      if (
        equipment.type === '투구' ||
        equipment.type === '상의' ||
        equipment.type === '하의' ||
        equipment.type === '장갑' ||
        equipment.type === '어깨'
      ) {
        const elixirs = equipment.elixirs;

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

  async getStatisticElixir(classEngrave: string): Promise<StatisticElixirDto> {
    const elixirCountMap = new Map();
    const datas =
      classEngrave === null
        ? await this.find()
        : await this.findByClassEngrave(classEngrave);

    datas.forEach((elixirSetting) => {
      if (elixirCountMap.has(elixirSetting.elixir))
        elixirCountMap.set(
          elixirSetting.elixir,
          elixirCountMap.get(elixirSetting.elixir) + 1,
        );
      else elixirCountMap.set(elixirSetting.elixir, 1);
    });

    const statisticElixir: StatisticElixirDto = {
      count: datas.length,
      elixirCounts: [],
    };

    elixirCountMap.forEach((count, elixir, _) => {
      statisticElixir.elixirCounts.push({ elixir, count });
    });

    statisticElixir.elixirCounts.sort((a, b) => b.count - a.count);

    return statisticElixir;
  }
}
