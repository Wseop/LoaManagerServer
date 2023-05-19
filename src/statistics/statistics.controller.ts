import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { StatisticsService } from './statistics.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateStatsChaosDto } from './dto/create-stats-chaos.dto';
import { CreateStatsGuardianDto } from './dto/create-stats-guardian.dto';
import { CreateStatsSettingDto } from './dto/create-stats-setting.dto';
import { CreateStatsSkillDto } from './dto/create-stats-skill.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { StatsCategory } from './enums/statistics-category.enum';

@ApiTags('statistics')
@Controller('stats')
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  @Get('/chaos/:level')
  getTotalStatsChaosByLevel(@Param('level') level: string) {
    return this.statisticsService.findTotalStatsByLevel(
      StatsCategory.Chaos,
      level,
    );
  }

  @Get('/guardian/:level')
  getTotalStatsGuardianByLevel(@Param('level') level: string) {
    return this.statisticsService.findTotalStatsByLevel(
      StatsCategory.Guardian,
      level,
    );
  }

  @Get('/setting/:className')
  getTotalStatsSettingByClassName(@Param('className') className: string) {}

  @Get('/skill/:className')
  getTotalStatsSkillByClassName(@Param('className') className: string) {}

  @UseGuards(AuthGuard('access'))
  @Post('/chaos')
  @ApiUnauthorizedResponse({ description: 'valid jwt required' })
  @ApiBadRequestResponse({ description: 'invalid body' })
  @ApiCreatedResponse()
  createChaosStats(@Body() createStatsChaosDto: CreateStatsChaosDto) {
    return this.statisticsService.createStats(
      StatsCategory.Chaos,
      createStatsChaosDto,
    );
  }

  @UseGuards(AuthGuard('access'))
  @Post('/guardian')
  @ApiUnauthorizedResponse({ description: 'valid jwt required' })
  @ApiBadRequestResponse({ description: 'invalid body' })
  @ApiCreatedResponse()
  createGuardianStats(@Body() createStatsGuardianDto: CreateStatsGuardianDto) {
    return this.statisticsService.createStats(
      StatsCategory.Guardian,
      createStatsGuardianDto,
    );
  }

  @Post('/setting')
  @ApiBadRequestResponse({ description: 'invalid body' })
  @ApiCreatedResponse()
  createSettingStats(@Body() createStatsSettingDto: CreateStatsSettingDto) {
    return this.statisticsService.createStats(
      StatsCategory.Setting,
      createStatsSettingDto,
    );
  }

  @Post('/skill')
  @ApiBadRequestResponse({ description: 'invalid body' })
  @ApiCreatedResponse()
  createSkillStats(@Body() createStatsSkillDto: CreateStatsSkillDto) {
    return this.statisticsService.createStats(
      StatsCategory.Skill,
      createStatsSkillDto,
    );
  }
}
