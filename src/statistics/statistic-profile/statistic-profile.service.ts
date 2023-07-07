import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Profile } from './schemas/profile.schema';
import { Model } from 'mongoose';
import { StatisticProfileEngraveDto } from './dto/statistic-profile-engrave.dto';
import { StatisticProfileClassDto } from './dto/statistic-profile-class.dto';

@Injectable()
export class StatisticProfileService {
  constructor(
    @InjectModel(Profile.name)
    private readonly profileModel: Model<Profile>,
  ) {}

  async find(): Promise<Profile[]> {
    return await this.profileModel.find();
  }

  async findByClassName(className: string): Promise<Profile[]> {
    return await this.profileModel.find({ className });
  }

  async findByName(characterName: string): Promise<Profile> {
    return await this.profileModel.findOne({ characterName });
  }

  async findByItemLevel(itemLevel: number): Promise<Profile[]> {
    return await this.profileModel.find({ itemLevel: { $gte: itemLevel } });
  }

  async upsert(profile: Profile): Promise<Profile> {
    return await this.profileModel.findOneAndUpdate(
      { characterName: profile.characterName },
      profile,
      { upsert: true, new: true },
    );
  }

  async deleteByCharacterName(characterName: string): Promise<number> {
    return (await this.profileModel.deleteOne({ characterName })).deletedCount;
  }

  async getStatisticClass(
    itemLevel: number,
  ): Promise<StatisticProfileClassDto> {
    const profiles =
      itemLevel === null
        ? await this.find()
        : await this.findByItemLevel(itemLevel);
    const result: StatisticProfileClassDto = {
      count: profiles.length,
      classCounts: [],
    };
    const classCountMap = new Map();

    profiles.forEach((profile) => {
      if (!classCountMap.has(profile.className))
        classCountMap.set(profile.className, 0);

      classCountMap.set(
        profile.className,
        classCountMap.get(profile.className) + 1,
      );
    });

    classCountMap.forEach((value, key, _) => {
      result.classCounts.push({
        count: value,
        className: key,
      });
    });

    return result;
  }

  async getStatisticClassEngrave(
    itemLevel: number,
  ): Promise<StatisticProfileEngraveDto> {
    const classEngraveCountMap = new Map();
    const datas =
      itemLevel === null
        ? await this.find()
        : await this.findByItemLevel(itemLevel);

    datas.forEach((value) => {
      if (!classEngraveCountMap.has(value.classEngrave))
        classEngraveCountMap.set(value.classEngrave, 0);

      classEngraveCountMap.set(
        value.classEngrave,
        classEngraveCountMap.get(value.classEngrave) + 1,
      );
    });

    const statisticProfileClass: StatisticProfileEngraveDto = {
      count: datas.length,
      classEngraveCounts: [],
    };

    classEngraveCountMap.forEach((value, key, _) => {
      statisticProfileClass.classEngraveCounts.push({
        count: value,
        classEngrave: key,
      });
    });

    statisticProfileClass.classEngraveCounts.sort((a, b) => b.count - a.count);

    return statisticProfileClass;
  }
}
