import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { SetSetting } from './schemas/set-setting.schema';
import { Model } from 'mongoose';
import { CharacterEquipment } from 'src/lostark/characters/interfaces/character-equipment.interface';
import { StatisticSetDto } from './dto/statistic-set.dto';

@Injectable()
export class StatisticSetService {
  constructor(
    @InjectModel(SetSetting.name)
    private readonly setSettingModel: Model<SetSetting>,
  ) {}

  async find(): Promise<SetSetting[]> {
    return await this.setSettingModel.find();
  }

  async findByClassEngrave(classEngrave: string): Promise<SetSetting[]> {
    return await this.setSettingModel.find({ classEngrave });
  }

  async upsert(setSetting: SetSetting): Promise<SetSetting> {
    return await this.setSettingModel.findOneAndUpdate(
      { characterName: setSetting.characterName },
      setSetting,
      { upsert: true, new: true },
    );
  }

  async deleteByCharacterName(characterName: string): Promise<number> {
    return (await this.setSettingModel.deleteOne({ characterName }))
      .deletedCount;
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

  async getStatisticSet(classEngrave: string): Promise<StatisticSetDto> {
    const setCountMap = new Map();
    const datas =
      classEngrave === null
        ? await this.find()
        : await this.findByClassEngrave(classEngrave);

    datas.forEach((setSetting) => {
      if (setCountMap.has(setSetting.set))
        setCountMap.set(setSetting.set, setCountMap.get(setSetting.set) + 1);
      else setCountMap.set(setSetting.set, 1);
    });

    const statisticSet: StatisticSetDto = {
      count: datas.length,
      setCounts: [],
    };

    setCountMap.forEach((count, set, _) => {
      statisticSet.setCounts.push({ set, count });
    });

    statisticSet.setCounts.sort((a, b) => b.count - a.count);

    return statisticSet;
  }
}
