import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CharacterService } from './character.service';
import { CreateCharacterSettingDto } from './dto/createCharacterSetting.dto';
import { CreateCharacterSkillDto } from './dto/createCharacterSkill.dto';

@Controller('character')
export class CharacterController {
  constructor(private readonly characterService: CharacterService) {}

  @Get('/:category')
  findAll(@Param('category') category: string) {
    return this.characterService.findAll(category);
  }

  @Get('/:category/:className')
  findByClass(
    @Param('category') category: string,
    @Param('className') className: string,
  ) {
    return this.characterService.findByClass(category, className);
  }

  @Post('/setting')
  createSetting(@Body() createCharacterSettingDto: CreateCharacterSettingDto) {
    return this.characterService.createSetting(createCharacterSettingDto);
  }

  @Post('/skill')
  createSkill(@Body() createCharacterSkillDto: CreateCharacterSkillDto) {
    return this.characterService.createSkill(createCharacterSkillDto);
  }
}
