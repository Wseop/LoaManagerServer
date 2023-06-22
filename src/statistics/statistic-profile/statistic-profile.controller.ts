import { Controller, Delete, Get, Param, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { StatisticProfileService } from './statistic-profile.service';
import { StatisticProfileClassDto } from './dto/statistic-profile-class.dto';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('[Statistics] profile')
@Controller('statistics/profile')
export class StatisticProfileController {
  constructor(
    private readonly statisticProfileService: StatisticProfileService,
  ) {}

  @Get()
  @ApiOkResponse({ type: StatisticProfileClassDto })
  getStatisticProfileClass(): Promise<StatisticProfileClassDto> {
    return this.statisticProfileService.getStatisticProfileClass(null);
  }

  @Get('/:className')
  @ApiParam({ name: 'className', required: true, example: '버서커' })
  @ApiOkResponse({ type: StatisticProfileClassDto })
  getStatisticProfileClassByClassName(
    @Param('className') className: string,
  ): Promise<StatisticProfileClassDto> {
    return this.statisticProfileService.getStatisticProfileClass(className);
  }

  @Delete('/:characterName')
  @UseGuards(AuthGuard('access'))
  @ApiOkResponse({ type: Number })
  @ApiUnauthorizedResponse()
  @ApiBearerAuth()
  deleteByCharacterName(
    @Param('characterName') characterName: string,
  ): Promise<number> {
    return this.statisticProfileService.deleteByCharacterName(characterName);
  }
}
