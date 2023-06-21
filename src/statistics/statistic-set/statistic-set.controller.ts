import { Controller, Delete, Get, Param, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { StatisticSetService } from './statistic-set.service';
import { StatisticSetDto } from './dto/statistic-set.dto';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('[Statistics] set')
@Controller('statistics/set')
export class StatisticSetController {
  constructor(private readonly statisticSetService: StatisticSetService) {}

  @Get()
  @ApiOkResponse({ type: StatisticSetDto })
  getStatisticSet(): Promise<StatisticSetDto> {
    return this.statisticSetService.getStatisticSet(null);
  }

  @Get('/:classEngrave')
  @ApiParam({ name: 'classEngrave', required: true, example: '축복의 오라' })
  @ApiOkResponse({ type: StatisticSetDto })
  getStatisticSetByClassEngrave(
    @Param('classEngrave') classEngrave: string,
  ): Promise<StatisticSetDto> {
    return this.statisticSetService.getStatisticSet(classEngrave);
  }

  @Delete('/:characterName')
  @UseGuards(AuthGuard('access'))
  @ApiOkResponse({ type: Number })
  @ApiUnauthorizedResponse()
  @ApiBearerAuth()
  deleteByCharacterName(
    @Param('characterName') characterName: string,
  ): Promise<number> {
    return this.statisticSetService.deleteByCharacterName(characterName);
  }
}
