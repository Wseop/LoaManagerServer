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
  createGuardianReward(
    @Body() createGuardianRewardDto: CreateGuardianRewardDto,
  ) {
    return this.statisticsService.createGuardianReward(createGuardianRewardDto);
  }

  @Get('/settings/armory/:className')
  getStatsArmorySetting(@Param('className') className: string) {
    return this.statisticsService.getStatsArmorySetting(className);
  }

  @Get('/settings/skill/:className')
  getStatsSkillSetting(@Param('className') className: string) {
    return this.statisticsService.getStatsSkillSetting(className);
  }
}
