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

  @Get('/chaos/:level')
  @ApiOkResponse()
  getStatisticsChaos(@Param('level') level: string) {
    return this.statisticsService.getStatisticsChaos(level);
  }

  @Post('/chaos')
  @UseGuards(AuthGuard('access'))
  @ApiUnauthorizedResponse()
  @ApiBadRequestResponse()
  @ApiCreatedResponse()
  createChaosReward(@Body() createChaosRewardDto: CreateChaosRewardDto) {
    return this.statisticsService.createChaosReward(createChaosRewardDto);
  }

  @Get('/guardian/:level')
  @ApiOkResponse()
  getStatisticsGuardian(@Param('level') level: string) {
    return this.statisticsService.getStatisticsGuardian(level);
  }

  @Post('/guardian')
  @UseGuards(AuthGuard('access'))
  @ApiUnauthorizedResponse()
  @ApiBadRequestResponse()
  @ApiCreatedResponse()
  createGuardianReward(
    @Body() createGuardianRewardDto: CreateGuardianRewardDto,
  ) {
    return this.statisticsService.createGuardianReward(createGuardianRewardDto);
  }

  @Get('/skill/:className')
  getStatisticsSkill(@Param('className') className: string) {
    return this.statisticsService.getStatisticsSkill(className);
  }
}
