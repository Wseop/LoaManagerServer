import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Profile } from './schemas/profile.schema';
import { FilterQuery, Model, ProjectionType } from 'mongoose';
import { ProfileDto } from './dto/profile.dto';

@Injectable()
export class ProfilesService {
  constructor(
    @InjectModel(Profile.name)
    private readonly profileModel: Model<Profile>,
  ) {}

  async find(
    filter?: FilterQuery<Profile>,
    fields?: string[],
  ): Promise<ProfileDto[]> {
    const projection: ProjectionType<Profile> = {
      _id: 0,
    };
    if (fields) {
      fields.forEach((field) => {
        projection[field] = 1;
      });
    }

    return await this.profileModel.find(filter, projection);
  }

  async findOne(
    filter: FilterQuery<Profile>,
    fields?: string[],
  ): Promise<ProfileDto> {
    const projection: ProjectionType<Profile> = {
      _id: 0,
    };
    if (fields) {
      fields.forEach((field) => {
        projection[field] = 1;
      });
    }

    return await this.profileModel.findOne(filter, projection);
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
}
