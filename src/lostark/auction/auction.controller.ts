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
import { AuctionService } from './auction.service';
import { AuctionItemDto } from './dto/auction-item.dto';
import { AuctionQueryDto } from './dto/auction-query.dto';

@ApiTags('Lostark - Auction')
@Controller('lostark/auction')
export class AuctionController {
  constructor(private readonly auctionService: AuctionService) {}

  @Get('/items')
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiOkResponse({ type: [AuctionItemDto] })
  @ApiTooManyRequestsResponse({ description: 'API request limit' })
  @ApiServiceUnavailableResponse({
    description: 'Lostark api server is under maintenance',
  })
  searchAuctionItems(
    @Query() query: AuctionQueryDto,
  ): Promise<AuctionItemDto[]> {
    return this.auctionService.searchAuctionItems(query);
  }
}
