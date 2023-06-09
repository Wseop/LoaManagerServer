import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Profile } from './schemas/profile.schema';
import { Model } from 'mongoose';

@Injectable()
export class ProfilesService {
  constructor(
    @InjectModel(Profile.name)
    private readonly profileModel: Model<Profile>,
  ) {}

  async findAllProfiles() {
    return await this.profileModel.find();
  }

  async findProfileByName(characterName: string) {
    return await this.profileModel.findOne({ characterName });
  }

  async findProfilesByClassName(className: string) {
    return await this.profileModel.find({ className });
  }

  async upsertProfile(profile: Profile) {
    return await this.profileModel.findOneAndUpdate(
      { characterName: profile.characterName },
      profile,
      { upsert: true, new: true },
    );
  }

  async deleteProfile(characterName: string) {
    return await this.profileModel.deleteOne({ characterName });
  }
}
