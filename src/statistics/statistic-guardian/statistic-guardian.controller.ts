import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { StatisticGuardianService } from './statistic-guardian.service';
import { StatisticGuardianDto } from './dto/statistic-guardian.dto';
import { AuthGuard } from '@nestjs/passport';
import { CreateStatisticGuardianDto } from './dto/create-statistic-guardian.dto';

@ApiTags('[Statistics] guardian')
@Controller('statistics/guardian')
export class StatisticGuardianController {
  constructor(
    private readonly statisticGuardianService: StatisticGuardianService,
  ) {}

  @Get('/:level')
  @ApiParam({ name: 'level', required: true, example: '가르가디스' })
  @ApiOkResponse({ type: StatisticGuardianDto })
  getStatisticGuardian(
    @Param('level') level: string,
  ): Promise<StatisticGuardianDto> {
    return this.statisticGuardianService.getStatisticGuardian(level);
  }

  @Post()
  @UseGuards(AuthGuard('access'))
  @ApiUnauthorizedResponse()
  @ApiBadRequestResponse()
  @ApiCreatedResponse({ type: StatisticGuardianDto })
  @ApiBearerAuth()
  createGuardianReward(
    @Body() createGuardianRewardDto: CreateStatisticGuardianDto,
  ): Promise<StatisticGuardianDto> {
    return this.statisticGuardianService.create(createGuardianRewardDto);
  }
}
