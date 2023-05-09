import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { StatisticsService } from './statistics.service';
import { AuthGuard } from '@nestjs/passport';
import { StatsChaosDto } from './dto/statsChaos.dto';
import { StatsGuardianDto } from './dto/statsGuardian.dto';
import { StatsSettingDto } from './dto/statsSetting.dto';
import { StatsSkillDto } from './dto/statsSkill.dto';

@Controller('stats')
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  @Get('/:category/:filter')
  findStats(
    @Param('category') category: string,
    @Param('filter') filter: string,
  ) {
    if (category === 'chaos' || category === 'guardian') {
      return this.statisticsService.findStatsByLevel(category, filter);
    } else if (category === 'setting' || category === 'skill') {
      return this.statisticsService.findStatsByClass(category, filter);
    } else {
      throw new BadRequestException();
    }
  }

  @UseGuards(AuthGuard('access'))
  @Post('/chaos')
  createChaosStats(@Body() statsChaosDto: StatsChaosDto) {
    return this.statisticsService.createStats('chaos', statsChaosDto);
  }

  @UseGuards(AuthGuard('access'))
  @Post('/guardian')
  createGuardianStats(@Body() statsGuardianDto: StatsGuardianDto) {
    return this.statisticsService.createStats('guardian', statsGuardianDto);
  }

  @UseGuards(AuthGuard('access'))
  @Post('/setting')
  createSettingStats(@Body() statsSettingDto: StatsSettingDto) {
    return this.statisticsService.createStats('setting', statsSettingDto);
  }

  @UseGuards(AuthGuard('access'))
  @Post('/skill')
  createSkillStats(@Body() statsSkillDto: StatsSkillDto) {
    return this.statisticsService.createStats('skill', statsSkillDto);
  }
}
