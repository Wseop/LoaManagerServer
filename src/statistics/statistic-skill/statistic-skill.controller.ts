import { Controller, Get, Param } from '@nestjs/common';
import { ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { StatisticSkillService } from './statistic-skill.service';
import { StatisticSkillDto } from './dto/statistic-skill.dto';

@ApiTags('[Statistics] skill')
@Controller('statistics/skill')
export class StatisticSkillController {
  constructor(private readonly statisticSkillService: StatisticSkillService) {}

  @Get('/:classEngrave')
  @ApiParam({ name: 'classEngrave', required: true, example: '축복의 오라' })
  @ApiOkResponse({ type: StatisticSkillDto })
  getStatisticSkill(
    @Param('classEngrave') classEngrave: string,
  ): Promise<StatisticSkillDto> {
    return this.statisticSkillService.getStatisticSkill(classEngrave);
  }
}
