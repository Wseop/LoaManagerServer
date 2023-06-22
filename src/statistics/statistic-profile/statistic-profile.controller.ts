import { Controller, Get, Param } from '@nestjs/common';
import { ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { StatisticProfileService } from './statistic-profile.service';
import { StatisticProfileClassDto } from './dto/statistic-profile-class.dto';

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
}
