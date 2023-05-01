import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
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

  async findCharacters(category: string) {
    if (category === 'setting') {
      return await this.characterSettingModel.find().exec();
    } else if (category === 'skill') {
      return await this.characterSkillModel.find().exec();
    } else {
      throw new BadRequestException();
    }
  }

  async findCharactersByClass(category: string, className: string) {
    if (category === 'setting') {
      return await this.characterSettingModel.find({ className }).exec();
    } else if (category === 'skill') {
      return await this.characterSkillModel.find({ className }).exec();
    } else {
      throw new BadRequestException();
    }
  }

  async createSetting(createCharacterSettingDto: CreateCharacterSettingDto) {
    return await this.characterSettingModel.findOneAndUpdate(
      { characterName: createCharacterSettingDto.characterName },
      createCharacterSettingDto,
      { upsert: true, new: true },
    );
  }

  async createSkill(createCharacterSkillDto: CreateCharacterSkillDto) {
    return await this.characterSkillModel.findOneAndUpdate(
      { characterName: createCharacterSkillDto.characterName },
      createCharacterSkillDto,
      { upsert: true, new: true },
    );
  }
}
