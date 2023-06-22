import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Profile } from './schemas/profile.schema';
import { Model } from 'mongoose';
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

  async getStatisticProfileClass(
    className: string,
  ): Promise<StatisticProfileClassDto> {
    const classEngraveCountMap = new Map();
    const datas =
      className === null
        ? await this.find()
        : await this.findByClassName(className);

    datas.forEach((value) => {
      if (!classEngraveCountMap.has(value.classEngrave))
        classEngraveCountMap.set(value.classEngrave, 0);

      classEngraveCountMap.set(
        value.classEngrave,
        classEngraveCountMap.get(value.classEngrave) + 1,
      );
    });

    const statisticProfileClass: StatisticProfileClassDto = {
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
