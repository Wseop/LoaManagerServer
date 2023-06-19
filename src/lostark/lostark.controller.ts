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
  ApiParam,
  ApiServiceUnavailableResponse,
  ApiTags,
  ApiTooManyRequestsResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuctionQueryDto } from './auctions/dto/auction-query.dto';
import { MarketQueryDto } from './markets/dto/market-query.dto';
import { AuctionItemDto } from './auctions/dto/auction-item.dto';
import { MarketItemDto } from './markets/dto/market-item.dto';
import { CharacterInfoDto } from './characters/dto/characterInfo.dto';
import { SiblingDto } from './characters/dto/sibling.dto';

@ApiTags('Lostark')
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
  @ApiParam({
    name: 'characterName',
    required: true,
    example: '쿠키바닐라쉐이크',
  })
  @ApiOkResponse({ type: CharacterInfoDto })
  @ApiTooManyRequestsResponse({ description: 'API request limit' })
  @ApiServiceUnavailableResponse({
    description: 'Lostark api server is under maintenance',
  })
  getCharacterInfo(@Param('characterName') characterName: string) {
    return this.lostarkService.getCharacterInfo(characterName);
  }

  @Get('/characters/:characterName/siblings')
  @ApiParam({
    name: 'characterName',
    required: true,
    example: '쿠키바닐라쉐이크',
  })
  @ApiOkResponse({ type: [SiblingDto] })
  @ApiTooManyRequestsResponse({ description: 'API request limit' })
  @ApiServiceUnavailableResponse({
    description: 'Lostark api server is under maintenance',
  })
  getSiblings(@Param('characterName') characterName: string) {
    return this.lostarkService.getSiblings(characterName);
  }

  @Get('/auctions/items')
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiOkResponse({ type: [AuctionItemDto] })
  @ApiTooManyRequestsResponse({ description: 'API request limit' })
  @ApiServiceUnavailableResponse({
    description: 'Lostark api server is under maintenance',
  })
  searchAuctionItems(@Query() query: AuctionQueryDto) {
    return this.lostarkService.searchAuctionItems(query);
  }

  @Get('/markets/items')
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiOkResponse({ type: [MarketItemDto] })
  @ApiTooManyRequestsResponse({ description: 'API request limit' })
  @ApiServiceUnavailableResponse({
    description: 'Lostark api server is under maintenance',
  })
  searchMarketItems(@Query() query: MarketQueryDto) {
    return this.lostarkService.searchMarketItems(query);
  }
}
