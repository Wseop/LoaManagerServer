import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CharacterService } from './character.service';
import { CreateCharacterSettingDto } from './dto/createCharacterSetting.dto';
import { CreateCharacterSkillDto } from './dto/createCharacterSkill.dto';

@Controller('character')
export class CharacterController {
  constructor(private readonly characterService: CharacterService) {}

  @Get('/setting')
  findSettings() {
    return this.characterService.findSettings();
  }

  @Get('/setting/:className')
  findSettingsByClass(@Param('className') className: string) {
    return this.characterService.findSettingsByClass(className);
  }

  @Post('/setting')
  createSetting(@Body() createCharacterSettingDto: CreateCharacterSettingDto) {
    return this.characterService.createSetting(createCharacterSettingDto);
  }

  @Get('/skill')
  findSkills() {
    return this.characterService.findSkills();
  }

  @Get('skill/:className')
  findSkillsByClass(@Param('className') className: string) {
    return this.characterService.findSkillsByClass(className);
  }

  @Post('/skill')
  createSkill(@Body() createCharacterSkillDto: CreateCharacterSkillDto) {
    return this.characterService.createSkill(createCharacterSkillDto);
  }
}
