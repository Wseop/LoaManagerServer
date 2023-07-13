import { Controller, Delete, Get, Param, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { SkillSettingsService } from './skill-settings.service';
import { AuthGuard } from '@nestjs/passport';
import { SkillSettingDto } from './dto/skill-setting.dto';

@ApiTags('[Users] skill-settings')
@Controller('users/skillsettings')
export class SkillSettingsController {
  constructor(private readonly skillSettingsService: SkillSettingsService) {}

  @Get('/:characterName')
  @ApiOkResponse({ type: SkillSettingDto })
  @ApiParam({
    name: 'characterName',
    required: true,
    example: '쿠키바닐라쉐이크',
  })
  getSkillSetting(
    @Param('characterName') characterName: string,
  ): Promise<SkillSettingDto> {
    return this.skillSettingsService.findOne({ characterName });
  }

  @Delete('/:characterName')
  @UseGuards(AuthGuard('access'))
  @ApiOkResponse({ type: Number })
  @ApiUnauthorizedResponse()
  @ApiBearerAuth()
  deleteByCharacterName(
    @Param('characterName') characterName: string,
  ): Promise<number> {
    return this.skillSettingsService.deleteByCharacterName(characterName);
  }
}
