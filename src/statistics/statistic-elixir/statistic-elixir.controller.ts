import { Controller, Delete, Get, Param, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { StatisticElixirService } from './statistic-elixir.service';
import { StatisticElixirDto } from './dto/statistic-elixir.dto';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('[Statistics] elixir')
@Controller('statistics/elixir')
export class StatisticElixirController {
  constructor(
    private readonly statisticElixirService: StatisticElixirService,
  ) {}

  @Get()
  @ApiOkResponse({ type: StatisticElixirDto })
  getStatisticElixir(): Promise<StatisticElixirDto> {
    return this.statisticElixirService.getStatisticElixir(null);
  }

  @Get('/:classEngrave')
  @ApiParam({ name: 'classEngrave', required: true, example: '축복의 오라' })
  @ApiOkResponse({ type: StatisticElixirDto })
  getStatisticElixirByClassEngrave(
    @Param('classEngrave') classEngrave: string,
  ): Promise<StatisticElixirDto> {
    return this.statisticElixirService.getStatisticElixir(classEngrave);
  }

  @Delete('/:characterName')
  @UseGuards(AuthGuard('access'))
  @ApiOkResponse({ type: Number })
  @ApiUnauthorizedResponse()
  @ApiBearerAuth()
  deleteByCharacterName(
    @Param('characterName') characterName: string,
  ): Promise<number> {
    return this.statisticElixirService.deleteByCharacterName(characterName);
  }
}
