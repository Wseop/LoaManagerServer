import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CharacterSetting } from './schemas/characterSetting.schema';
import { Model } from 'mongoose';
import { CreateCharacterSettingDto } from './dto/createCharacterSetting.dto';
import { CharacterSkill } from './schemas/characterSkill.schema';
import { CreateCharacterSkillDto } from './dto/createCharacterSkill.dto';

@Injectable()
export class CharacterService {
  constructor(
    @InjectModel(CharacterSetting.name)
    private readonly characterSettingModel: Model<CharacterSetting>,

    @InjectModel(CharacterSkill.name)
    private readonly characterSkillModel: Model<CharacterSkill>,
  ) {}

  async findSettings() {
    return await this.characterSettingModel.find().exec();
  }

  async findSettingsByClass(className: string) {
    return await this.characterSettingModel.find({ className }).exec();
  }

  async createSetting(createCharacterSettingDto: CreateCharacterSettingDto) {
    return await this.characterSettingModel.replaceOne(
      { characterName: createCharacterSettingDto.characterName },
      createCharacterSettingDto,
      { upsert: true },
    );
  }

  async findSkills() {
    return await this.characterSkillModel.find().exec();
  }

  async findSkillsByClass(className: string) {
    return await this.characterSkillModel.find({ className }).exec();
  }

  async createSkill(createCharacterSkillDto: CreateCharacterSkillDto) {
    return await this.characterSkillModel.replaceOne(
      { characterName: createCharacterSkillDto.characterName },
      createCharacterSkillDto,
      { upsert: true },
    );
  }
}
