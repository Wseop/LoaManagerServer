import { Injectable } from '@nestjs/common';
import { StatisticProfileDto } from './dto/statistic-profile.dto';
import { ProfilesService } from 'src/users/profiles/profiles.service';
import { FilterQuery } from 'mongoose';
import { Profile } from 'src/users/profiles/schemas/profile.schema';
import { CharacterEngrave } from 'src/lostark/characters/interfaces/character-engrave.interface';

@Injectable()
export class StatisticProfileService {
  constructor(private readonly profilesService: ProfilesService) {}

  async getStatisticProfile(field: string, filter?: FilterQuery<Profile>) {
    const profiles = await this.profilesService.find(filter, [field]);
    const statisticProfile: StatisticProfileDto = {
      total: 0,
      data: [],
    };
    const dataMap = new Map();

    profiles.forEach((profile) => {
      if (profile[field]) {
        statisticProfile.total++;

        if (!dataMap.has(profile[field])) dataMap.set(profile[field], 0);
        dataMap.set(profile[field], dataMap.get(profile[field]) + 1);
      }
    });

    dataMap.forEach((count, value, _) => {
      statisticProfile.data.push({ count, value });
    });

    statisticProfile.data.sort((a, b) => b.count - a.count);

    return statisticProfile;
  }

  async getStatisticEngrave(
    filter: FilterQuery<Profile>,
    engraveLevel: number,
  ) {
    const profiles = await this.profilesService.find(filter, ['engraves']);
    const statisticEngrave: StatisticProfileDto = {
      total: profiles.length,
      data: [],
    };
    const dataMap = new Map();

    profiles.forEach((profile) => {
      profile.engraves.forEach((engrave: CharacterEngrave) => {
        if (engrave.engraveLevel === engraveLevel) {
          if (!dataMap.has(engrave.engraveName))
            dataMap.set(engrave.engraveName, 0);
          dataMap.set(
            engrave.engraveName,
            dataMap.get(engrave.engraveName) + 1,
          );
        }
      });
    });

    dataMap.forEach((count, value, _) => {
      statisticEngrave.data.push({ count, value });
    });

    statisticEngrave.data.sort((a, b) => b.count - a.count);

    return statisticEngrave;
  }
}
