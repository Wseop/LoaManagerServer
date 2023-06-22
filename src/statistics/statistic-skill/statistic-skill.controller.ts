import { Controller, Delete, Get, Param, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { StatisticSkillService } from './statistic-skill.service';
import { StatisticSkillDto } from './dto/statistic-skill.dto';
import { AuthGuard } from '@nestjs/passport';

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

  @Delete('/:characterName')
  @UseGuards(AuthGuard('access'))
  @ApiOkResponse({ type: Number })
  @ApiUnauthorizedResponse()
  @ApiBearerAuth()
  deleteByCharacterName(
    @Param('characterName') characterName: string,
  ): Promise<number> {
    return this.statisticSkillService.deleteByCharacterName(characterName);
  }
}
