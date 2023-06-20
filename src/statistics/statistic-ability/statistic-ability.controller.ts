import { Controller, Get, Param } from '@nestjs/common';
import { ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { StatisticAbilityService } from './statistic-ability.service';
import { StatisticAbilityDto } from './dto/statistic-ability.dto';

@ApiTags('[Statistics] ability')
@Controller('statistics/ability')
export class StatisticAbilityController {
  constructor(
    private readonly statisticAbilityService: StatisticAbilityService,
  ) {}

  @Get()
  @ApiOkResponse({ type: StatisticAbilityDto })
  getStatisticsAbility(): Promise<StatisticAbilityDto> {
    return this.statisticAbilityService.getStatisticsAbility(null);
  }

  @Get('/:classEngrave')
  @ApiParam({
    name: 'classEngrave',
    required: true,
    example: '축복의 오라',
  })
  @ApiOkResponse({ type: StatisticAbilityDto })
  getStatisticsAbilitByClassEngrave(
    @Param('classEngrave') classEngrave: string,
  ): Promise<StatisticAbilityDto> {
    return this.statisticAbilityService.getStatisticsAbility(classEngrave);
  }
}
