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
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@ApiTags('stats')
@Controller('stats')
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  @Get('/:category/:filter')
  @ApiBadRequestResponse({ description: 'invalid category' })
  @ApiOkResponse()
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
  @ApiUnauthorizedResponse({ description: 'valid jwt required' })
  @ApiBadRequestResponse({ description: 'invalid body' })
  @ApiCreatedResponse()
  createChaosStats(@Body() statsChaosDto: StatsChaosDto) {
    return this.statisticsService.createStats('chaos', statsChaosDto);
  }

  @UseGuards(AuthGuard('access'))
  @Post('/guardian')
  @ApiUnauthorizedResponse({ description: 'valid jwt required' })
  @ApiBadRequestResponse({ description: 'invalid body' })
  @ApiCreatedResponse()
  createGuardianStats(@Body() statsGuardianDto: StatsGuardianDto) {
    return this.statisticsService.createStats('guardian', statsGuardianDto);
  }

  @Post('/setting')
  @ApiBadRequestResponse({ description: 'invalid body' })
  @ApiCreatedResponse()
  createSettingStats(@Body() statsSettingDto: StatsSettingDto) {
    return this.statisticsService.createStats('setting', statsSettingDto);
  }

  @Post('/skill')
  @ApiBadRequestResponse({ description: 'invalid body' })
  @ApiCreatedResponse()
  createSkillStats(@Body() statsSkillDto: StatsSkillDto) {
    return this.statisticsService.createStats('skill', statsSkillDto);
  }
}
