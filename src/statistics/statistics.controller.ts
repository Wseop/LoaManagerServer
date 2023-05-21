import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { StatisticsService } from './statistics.service';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { CreateChaosRewardDto } from './chaos-rewards/dto/create-chaos-reward.dto';
import { CreateGuardianRewardDto } from './guardian-rewards/dto/create-guardian-reward.dto';
import { CreateArmorySettingDto } from './armory-settings/dto/create-armory-setting.dto';
import { CreateSkillSettingDto } from './skill-settings/dto/create-skill-setting.dto';

@ApiTags('statistics')
@Controller('statistics')
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  @Get('/rewards/chaos/:level')
  @ApiOkResponse()
  getStatsChaosReward(@Param('level') level: string) {
    return this.statisticsService.getStatsChaosReward(level);
  }

  @Post('/rewards/chaos')
  @UseGuards(AuthGuard('access'))
  @ApiUnauthorizedResponse()
  @ApiBadRequestResponse()
  @ApiCreatedResponse()
  createChaosReward(@Body() createChaosRewardDto: CreateChaosRewardDto) {
    return this.statisticsService.createChaosReward(createChaosRewardDto);
  }

  @Get('/rewards/guardian/:level')
  @ApiOkResponse()
  getStatsGuardianReward(@Param('level') level: string) {
    return this.statisticsService.getStatsGuardianReward(level);
  }

  @Post('/rewards/guardian')
  @UseGuards(AuthGuard('access'))
  @ApiUnauthorizedResponse()
  @ApiBadRequestResponse()
  @ApiCreatedResponse()
  createChaosGuardian(
    @Body() createGuardianRewardDto: CreateGuardianRewardDto,
  ) {
    return this.statisticsService.createGuardianReward(createGuardianRewardDto);
  }

  @Get('/settings/armory/:className')
  getStatsArmorySetting(@Param('className') className: string) {
    return this.statisticsService.getStatsArmorySetting(className);
  }

  @Post('/settings/armory')
  @UseGuards(AuthGuard('access'))
  @ApiUnauthorizedResponse()
  @ApiBadRequestResponse()
  @ApiCreatedResponse()
  createArmorySetting(@Body() createArmorySettingDto: CreateArmorySettingDto) {
    return this.statisticsService.createArmorySetting(createArmorySettingDto);
  }

  @Get('/settings/skill/:className')
  getStatsSkillSetting(@Param('className') className: string) {
    return this.statisticsService.getStatsSkillSetting(className);
  }

  @Post('/settings/skill')
  @UseGuards(AuthGuard('access'))
  @ApiUnauthorizedResponse()
  @ApiBadRequestResponse()
  @ApiCreatedResponse()
  createSkillSetting(@Body() createSkillSettingDto: CreateSkillSettingDto) {
    return this.statisticsService.createSkillSetting(createSkillSettingDto);
  }
}
