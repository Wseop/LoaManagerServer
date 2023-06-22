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
import { StatisticChaosService } from './statistic-chaos.service';
import { StatisticChaosDto } from './dto/statistic-chaos.dto';
import { AuthGuard } from '@nestjs/passport';
import { CreateStatisticChaosDto } from './dto/create-statistic-chaos.dto';

@ApiTags('[Statistics] chaos')
@Controller('statistics/chaos')
export class StatisticChaosController {
  constructor(private readonly statisticChaosService: StatisticChaosService) {}

  @Get('/:level')
  @ApiParam({ name: 'level', required: true, example: '계몽1' })
  @ApiOkResponse({ type: StatisticChaosDto })
  getStatisticsChaos(
    @Param('level') level: string,
  ): Promise<StatisticChaosDto> {
    return this.statisticChaosService.getStatisticChaos(level);
  }

  @Post()
  @UseGuards(AuthGuard('access'))
  @ApiUnauthorizedResponse()
  @ApiBadRequestResponse()
  @ApiCreatedResponse({ type: StatisticChaosDto })
  @ApiBearerAuth()
  createStatisticChaos(
    @Body() createStatisticChaosDto: CreateStatisticChaosDto,
  ): Promise<StatisticChaosDto> {
    return this.statisticChaosService.create(createStatisticChaosDto);
  }
}
