import {
  Controller,
  Get,
  Param,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { StatisticProfileService } from './statistic-profile.service';
import { StatisticProfileDto } from './dto/statistic-profile.dto';

@ApiTags('[Statistics] profile')
@Controller('statistics/profile')
export class StatisticProfileController {
  constructor(
    private readonly statisticProfileService: StatisticProfileService,
  ) {}

  @Get('/class')
  @ApiOkResponse({ type: StatisticProfileDto })
  getStatisticClass(): Promise<StatisticProfileDto> {
    return this.statisticProfileService.getStatisticProfile('className');
  }

  @Get('/class/:itemLevel')
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiParam({ name: 'itemLevel', required: true, example: 1620 })
  @ApiOkResponse({ type: StatisticProfileDto })
  getStatisticClassByLevel(
    @Param('itemLevel') itemLevel: number,
  ): Promise<StatisticProfileDto> {
    return this.statisticProfileService.getStatisticProfile('className', {
      itemLevel: { $gte: itemLevel },
    });
  }

  @Get('/classEngrave')
  @ApiOkResponse({ type: StatisticProfileDto })
  getStatisticClassEngrave(): Promise<StatisticProfileDto> {
    return this.statisticProfileService.getStatisticProfile('classEngrave');
  }

  @Get('/classEngrave/:itemLevel')
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiParam({ name: 'itemLevel', required: true, example: 1620 })
  @ApiOkResponse({ type: StatisticProfileDto })
  getStatisticClassEngraveByLevel(
    @Param('itemLevel') itemLevel: number,
  ): Promise<StatisticProfileDto> {
    return this.statisticProfileService.getStatisticProfile('classEngrave', {
      itemLevel: { $gte: itemLevel },
    });
  }

  @Get('/ability/:classEngrave')
  @ApiParam({ name: 'classEngrave', required: true, example: '축복의 오라' })
  @ApiOkResponse({ type: StatisticProfileDto })
  getStatisticAbility(
    @Param('classEngrave') classEngrave: string,
  ): Promise<StatisticProfileDto> {
    return this.statisticProfileService.getStatisticProfile('ability', {
      classEngrave,
    });
  }

  @Get('/set/:classEngrave')
  @ApiParam({ name: 'classEngrave', required: true, example: '축복의 오라' })
  @ApiOkResponse({ type: StatisticProfileDto })
  getStatisticSet(
    @Param('classEngrave') classEngrave: string,
  ): Promise<StatisticProfileDto> {
    return this.statisticProfileService.getStatisticProfile('set', {
      classEngrave,
    });
  }

  @Get('/elixir/:classEngrave')
  @ApiParam({ name: 'classEngrave', required: true, example: '축복의 오라' })
  @ApiOkResponse({ type: StatisticProfileDto })
  getStatisticElixir(
    @Param('classEngrave') classEngrave: string,
  ): Promise<StatisticProfileDto> {
    return this.statisticProfileService.getStatisticProfile('elixir', {
      classEngrave,
    });
  }

  @Get('/engrave/:classEngrave/:engraveLevel')
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiParam({ name: 'classEngrave', required: true, example: '축복의 오라' })
  @ApiParam({ name: 'engraveLevel', required: true, example: 3 })
  @ApiOkResponse({ type: StatisticProfileDto })
  getStatisticEngrave(
    @Param('classEngrave') classEngrave: string,
    @Param('engraveLevel') engraveLevel: number,
  ): Promise<StatisticProfileDto> {
    return this.statisticProfileService.getStatisticEngrave(
      { classEngrave },
      engraveLevel,
    );
  }
}
