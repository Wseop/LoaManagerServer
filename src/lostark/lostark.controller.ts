import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { LostarkService } from './lostark.service';
import { CreateApiKeyDto } from './api-keys/dto/create-api-key.dto';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiServiceUnavailableResponse,
  ApiTags,
  ApiTooManyRequestsResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuctionQueryDto } from './auctions/dto/auction-query.dto';
import { MarketQueryDto } from './markets/dto/market-query.dto';

@ApiTags('lostark')
@Controller('lostark')
export class LostarkController {
  constructor(private readonly lostarkService: LostarkService) {}

  @Post('/apiKey')
  @UseGuards(AuthGuard('access'))
  @ApiUnauthorizedResponse()
  @ApiCreatedResponse()
  createApiKey(@Body() createApiKey: CreateApiKeyDto) {
    return this.lostarkService.createApiKey(createApiKey);
  }

  @Get('/characters/:characterName')
  @ApiOkResponse()
  @ApiTooManyRequestsResponse({ description: 'API request limit' })
  @ApiServiceUnavailableResponse({
    description: 'Lostark api server is under maintenance',
  })
  getCharacterInfo(@Param('characterName') characterName: string) {
    return this.lostarkService.getCharacterInfo(characterName);
  }

  @Get('/characters/:characterName/siblings')
  @ApiOkResponse()
  @ApiTooManyRequestsResponse({ description: 'API request limit' })
  @ApiServiceUnavailableResponse({
    description: 'Lostark api server is under maintenance',
  })
  getSiblings(@Param('characterName') characterName: string) {
    return this.lostarkService.getSiblings(characterName);
  }

  @Get('/auctions/items')
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiOkResponse()
  @ApiTooManyRequestsResponse({ description: 'API request limit' })
  @ApiServiceUnavailableResponse({
    description: 'Lostark api server is under maintenance',
  })
  searchAuctionItems(@Query() query: AuctionQueryDto) {
    return this.lostarkService.searchAuctionItems(query);
  }

  @Get('/markets/items')
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiOkResponse()
  @ApiTooManyRequestsResponse({ description: 'API request limit' })
  @ApiServiceUnavailableResponse({
    description: 'Lostark api server is under maintenance',
  })
  searchMarketItems(@Query() query: MarketQueryDto) {
    return this.lostarkService.searchMarketItems(query);
  }
}
