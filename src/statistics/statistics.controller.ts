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
import { CreateStatsChaosDto } from './dto/create-stats-chaos.dto';
import { CreateStatsGuardianDto } from './dto/create-stats-guardian.dto';
import { CreateStatsSettingDto } from './dto/create-stats-setting.dto';
import { CreateStatsSkillDto } from './dto/create-stats-skill.dto';
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
  createChaosStats(@Body() createStatsChaosDto: CreateStatsChaosDto) {
    return this.statisticsService.createStats('chaos', createStatsChaosDto);
  }

  @UseGuards(AuthGuard('access'))
  @Post('/guardian')
  @ApiUnauthorizedResponse({ description: 'valid jwt required' })
  @ApiBadRequestResponse({ description: 'invalid body' })
  @ApiCreatedResponse()
  createGuardianStats(@Body() createStatsGuardianDto: CreateStatsGuardianDto) {
    return this.statisticsService.createStats(
      'guardian',
      createStatsGuardianDto,
    );
  }

  @Post('/setting')
  @ApiBadRequestResponse({ description: 'invalid body' })
  @ApiCreatedResponse()
  createSettingStats(@Body() createStatsSettingDto: CreateStatsSettingDto) {
    return this.statisticsService.createStats('setting', createStatsSettingDto);
  }

  @Post('/skill')
  @ApiBadRequestResponse({ description: 'invalid body' })
  @ApiCreatedResponse()
  createSkillStats(@Body() createStatsSkillDto: CreateStatsSkillDto) {
    return this.statisticsService.createStats('skill', createStatsSkillDto);
  }
}
