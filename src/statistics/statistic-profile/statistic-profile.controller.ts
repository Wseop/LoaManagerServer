import {
  Controller,
  Delete,
  Get,
  Param,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { StatisticProfileService } from './statistic-profile.service';
import { StatisticProfileEngraveDto } from './dto/statistic-profile-engrave.dto';
import { AuthGuard } from '@nestjs/passport';
import { StatisticProfileClassDto } from './dto/statistic-profile-class.dto';

@ApiTags('[Statistics] profile')
@Controller('statistics/profile')
export class StatisticProfileController {
  constructor(
    private readonly statisticProfileService: StatisticProfileService,
  ) {}

  @Get('/class')
  @ApiOkResponse({ type: StatisticProfileClassDto })
  getStatisticClass(): Promise<StatisticProfileClassDto> {
    return this.statisticProfileService.getStatisticClass(null);
  }

  @Get('/class/:itemLevel')
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiParam({ name: 'itemLevel', required: true, example: 1620 })
  @ApiOkResponse({ type: StatisticProfileClassDto })
  getStatisticClassByLevel(
    @Param('itemLevel') itemLevel: number,
  ): Promise<StatisticProfileClassDto> {
    return this.statisticProfileService.getStatisticClass(itemLevel);
  }

  @Get('/classEngrave')
  @ApiOkResponse({ type: StatisticProfileEngraveDto })
  getStatisticClassEngrave(): Promise<StatisticProfileEngraveDto> {
    return this.statisticProfileService.getStatisticClassEngrave(null);
  }

  @Get('/classEngrave/:itemLevel')
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiParam({ name: 'itemLevel', required: true, example: 1620 })
  @ApiOkResponse({ type: StatisticProfileEngraveDto })
  getStatisticClassEngraveByLevel(
    @Param('itemLevel') itemLevel: number,
  ): Promise<StatisticProfileEngraveDto> {
    return this.statisticProfileService.getStatisticClassEngrave(itemLevel);
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
