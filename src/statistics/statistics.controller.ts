import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { StatisticsService } from './statistics.service';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { CreateChaosRewardDto } from './chaos-rewards/dto/create-chaos-reward.dto';
import { CreateGuardianRewardDto } from './guardian-rewards/dto/create-guardian-reward.dto';
import { StatisticsChaosDto } from './dto/statistics-chaos.dto';
import { StatisticsGuardianDto } from './dto/statistics-guardian.dto';

@ApiTags('Statistics')
@Controller('statistics')
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  @Get('/chaos/:level')
  @ApiParam({ name: 'level', required: true, example: '계몽1' })
  @ApiOkResponse({ type: StatisticsChaosDto })
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
  @ApiParam({ name: 'level', required: true, example: '가르가디스' })
  @ApiOkResponse({ type: StatisticsGuardianDto })
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
  @ApiParam({ name: 'className', required: true, example: '버서커' })
  @ApiOkResponse()
  getStatisticsSkill(@Param('className') className: string) {
    return this.statisticsService.getStatisticsSkill(className);
  }

  @Get('/ability')
  @ApiOkResponse()
  getStatisticsAbility() {
    return this.statisticsService.getStatisticsAbility(null);
  }

  @Get('/ability/:className')
  @ApiParam({ name: 'className', required: true, example: '버서커' })
  @ApiOkResponse()
  getStatisticsAbilitByClassName(@Param('className') className: string) {
    return this.statisticsService.getStatisticsAbility(className);
  }

  @Get('/elixir')
  @ApiOkResponse()
  getStatisticsElixir() {
    return this.statisticsService.getStatisticsElixir(null);
  }

  @Get('/elixir/:className')
  @ApiParam({ name: 'className', required: true, example: '버서커' })
  @ApiOkResponse()
  getStatisticsElixirByClassName(@Param('className') className: string) {
    return this.statisticsService.getStatisticsElixir(className);
  }

  @Get('/engrave')
  @ApiOkResponse()
  getStatisticsEngrave() {
    return this.statisticsService.getStatisticsEngrave(null);
  }

  @Get('/engrave/:className')
  @ApiParam({ name: 'className', required: true, example: '버서커' })
  @ApiOkResponse()
  getStatisticsEngraveByClassName(@Param('className') className: string) {
    return this.statisticsService.getStatisticsEngrave(className);
  }

  @Get('/set')
  @ApiOkResponse()
  getStatisticsSet() {
    return this.statisticsService.getStatisticsSet(null);
  }

  @Get('/set/:className')
  @ApiParam({ name: 'className', required: true, example: '버서커' })
  @ApiOkResponse()
  getStatisticsSetByClassName(@Param('className') className: string) {
    return this.statisticsService.getStatisticsSet(className);
  }
}
