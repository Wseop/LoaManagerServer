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
import { StatisticEngraveService } from './statistic-engrave.service';
import { StatisticEngraveDto } from './dto/statistic-engrave.dto';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('[Statistics] engrave')
@Controller('statistics/engrave')
export class StatisticEngraveController {
  constructor(
    private readonly statisticEngraveService: StatisticEngraveService,
  ) {}

  @Get('/:engraveLevel')
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiParam({ name: 'engraveLevel', required: true, example: 3 })
  @ApiOkResponse({ type: StatisticEngraveDto })
  getStatisticEngrave(
    @Param('engraveLevel') engraveLevel: number,
  ): Promise<StatisticEngraveDto> {
    return this.statisticEngraveService.getStatisticEngrave(engraveLevel, null);
  }

  @Get('/:engraveLevel/:classEngrave')
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiParam({ name: 'engraveLevel', required: true, example: 3 })
  @ApiParam({ name: 'classEngrave', required: true, example: '축복의 오라' })
  @ApiOkResponse({ type: StatisticEngraveDto })
  getStatisticEngraveByClassName(
    @Param('engraveLevel') engraveLevel: number,
    @Param('classEngrave') classEngrave: string,
  ): Promise<StatisticEngraveDto> {
    return this.statisticEngraveService.getStatisticEngrave(
      engraveLevel,
      classEngrave,
    );
  }

  @Delete('/:characterName')
  @UseGuards(AuthGuard('access'))
  @ApiOkResponse({ type: Number })
  @ApiUnauthorizedResponse()
  @ApiBearerAuth()
  deleteByCharacterName(
    @Param('characterName') characterName: string,
  ): Promise<number> {
    return this.statisticEngraveService.deleteByCharacterName(characterName);
  }
}
