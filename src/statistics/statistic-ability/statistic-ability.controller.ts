import { Controller, Delete, Get, Param, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { StatisticAbilityService } from './statistic-ability.service';
import { StatisticAbilityDto } from './dto/statistic-ability.dto';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('[Statistics] ability')
@Controller('statistics/ability')
export class StatisticAbilityController {
  constructor(
    private readonly statisticAbilityService: StatisticAbilityService,
  ) {}

  @Get()
  @ApiOkResponse({ type: StatisticAbilityDto })
  getStatisticAbility(): Promise<StatisticAbilityDto> {
    return this.statisticAbilityService.getStatisticAbility(null);
  }

  @Get('/:classEngrave')
  @ApiParam({
    name: 'classEngrave',
    required: true,
    example: '축복의 오라',
  })
  @ApiOkResponse({ type: StatisticAbilityDto })
  getStatisticAbilitByClassEngrave(
    @Param('classEngrave') classEngrave: string,
  ): Promise<StatisticAbilityDto> {
    return this.statisticAbilityService.getStatisticAbility(classEngrave);
  }

  @Delete('/:characterName')
  @UseGuards(AuthGuard('access'))
  @ApiUnauthorizedResponse()
  @ApiBearerAuth()
  deleteByCharacterName(
    @Param('characterName') characterName: string,
  ): Promise<number> {
    return this.statisticAbilityService.deleteByCharacterName(characterName);
  }
}
