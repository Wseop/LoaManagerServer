import {
  Controller,
  Get,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiOkResponse,
  ApiServiceUnavailableResponse,
  ApiTags,
  ApiTooManyRequestsResponse,
} from '@nestjs/swagger';
import { MarketService } from './market.service';
import { MarketItemDto } from './dto/market-item.dto';
import { MarketQueryDto } from './dto/market-query.dto';

@ApiTags('[Lostark] market')
@Controller('lostark/market')
export class MarketController {
  constructor(private readonly marketService: MarketService) {}

  @Get('/items')
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiOkResponse({ type: [MarketItemDto] })
  @ApiTooManyRequestsResponse({ description: 'API request limit' })
  @ApiServiceUnavailableResponse({
    description: 'Lostark api server is under maintenance',
  })
  searchMarketItems(@Query() query: MarketQueryDto): Promise<MarketItemDto[]> {
    return this.marketService.searchMarketItems(query);
  }
}
