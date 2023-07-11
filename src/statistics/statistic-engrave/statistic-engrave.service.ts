import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { EngraveSetting } from './schemas/engrave-setting.schema';
import { Model } from 'mongoose';
import { StatisticEngraveDto } from './dto/statistic-engrave.dto';

@Injectable()
export class StatisticEngraveService {
  constructor(
    @InjectModel(EngraveSetting.name)
    private readonly engraveSettingModel: Model<EngraveSetting>,
  ) {}

  async find(): Promise<EngraveSetting[]> {
    return await this.engraveSettingModel.find();
  }

  async findByClassEngrave(classEngrave: string): Promise<EngraveSetting[]> {
    return await this.engraveSettingModel.find({ classEngrave });
  }

  async upsert(engraveSetting: EngraveSetting): Promise<EngraveSetting> {
    return await this.engraveSettingModel.findOneAndUpdate(
      { characterName: engraveSetting.characterName },
      engraveSetting,
      { upsert: true, new: true },
    );
  }

  async deleteByCharacterName(characterName: string): Promise<number> {
    return (await this.engraveSettingModel.deleteOne({ characterName }))
      .deletedCount;
  }

  async getStatisticEngrave(
    engraveLevel: number,
    classEngrave: string,
  ): Promise<StatisticEngraveDto> {
    const engraveCountMap = new Map();
    const datas =
      classEngrave === null
        ? await this.find()
        : await this.findByClassEngrave(classEngrave);

    datas.forEach((engraveSetting) => {
      engraveSetting.engraves.forEach((value) => {
        if (value.engraveLevel === engraveLevel) {
          if (engraveCountMap.has(value.engraveName))
            engraveCountMap.set(
              value.engraveName,
              engraveCountMap.get(value.engraveName) + 1,
            );
          else engraveCountMap.set(value.engraveName, 1);
        }
      });
    });

    const statisticEngrave: StatisticEngraveDto = {
      count: datas.length,
      engraveCounts: [],
    };

    engraveCountMap.forEach((count, engrave, _) => {
      statisticEngrave.engraveCounts.push({ engrave, count });
    });

    return statisticEngrave;
  }
}
