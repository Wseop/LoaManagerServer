import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { ApiKeysService } from './api-keys/api-keys.service';
import { CreateApiKeyDto } from './api-keys/dto/create-api-key.dto';
import { CharactersService } from './characters/characters.service';
import axios from 'axios';
import { AuctionsService } from './auctions/auctions.service';
import { AuctionQueryDto } from './auctions/dto/auction-query.dto';
import { MarketsService } from './markets/markets.service';
import { MarketQueryDto } from './markets/dto/market-query.dto';
import { AuctionItemDto } from './auctions/dto/auction-item.dto';
import { MarketItemDto } from './markets/dto/market-item.dto';
import { AuctionSearchOption } from './auctions/interfaces/auction-search-option.interface';
import { MarketSearchOption } from './markets/interfaces/market-search-option.interface';

@Injectable()
export class LostarkService {
  constructor(
    private readonly apiKeysService: ApiKeysService,
    private readonly charactersService: CharactersService,
    private readonly auctionsService: AuctionsService,
    private readonly marketsService: MarketsService,
  ) {}

  async createApiKey(createApiKeyDto: CreateApiKeyDto) {
    return await this.apiKeysService.createApiKey(createApiKeyDto);
  }

  async get(url: string) {
    try {
      return await axios.get(url, {
        headers: {
          Authorization: `bearer ${await this.apiKeysService.getApiKey()}`,
        },
      });
    } catch (error) {
      if (error.response.status === HttpStatus.SERVICE_UNAVAILABLE) {
        throw new ServiceUnavailableException(
          null,
          'Lostark api server is under maintenance',
        );
      } else if (error.response.status === HttpStatus.BAD_REQUEST) {
        throw new BadRequestException();
      } else if (error.response.status === HttpStatus.TOO_MANY_REQUESTS) {
        throw new HttpException(
          'API request limit',
          HttpStatus.TOO_MANY_REQUESTS,
        );
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async post(url: string, data: any) {
    try {
      return await axios.post(url, data, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `bearer ${await this.apiKeysService.getApiKey()}`,
        },
      });
    } catch (error) {
      if (error.response.status === HttpStatus.SERVICE_UNAVAILABLE) {
        throw new ServiceUnavailableException(
          null,
          'Lostark api server is under maintenance',
        );
      } else if (error.response.status === HttpStatus.BAD_REQUEST) {
        throw new BadRequestException();
      } else if (error.response.status === HttpStatus.TOO_MANY_REQUESTS) {
        throw new HttpException(
          'API request limit',
          HttpStatus.TOO_MANY_REQUESTS,
        );
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async getCharacterInfo(characterName: string) {
    const result = await this.get(
      `https://developer-lostark.game.onstove.com/armories/characters/${characterName}?filters=profiles%2Bequipment%2Bcombat-skills%2Bengravings%2Bcards%2Bgems%2Bcollectibles`,
    );

    if (result.data === null) {
      return null;
    } else {
      return await this.charactersService.parseCharacter(result.data);
    }
  }

  async getSiblings(characterName: string) {
    const result = await this.get(
      `https://developer-lostark.game.onstove.com/characters/${characterName}/siblings`,
    );

    if (result.data === null) {
      return null;
    } else {
      return await this.charactersService.parseSiblings(result.data);
    }
  }

  async searchAuctionItems(query: AuctionQueryDto) {
    const url = 'https://developer-lostark.game.onstove.com/auctions/items';
    const searchOption: AuctionSearchOption =
      this.auctionsService.buildSearchOption(query);
    const auctionItems: AuctionItemDto[] = [];

    if (query.pageAll) {
      let pageNo = 1;

      while (pageNo <= 10) {
        searchOption.PageNo = pageNo++;

        const result = await this.post(url, searchOption);
        if (result.data.Items === null) break;

        result.data.Items.forEach((item) => {
          auctionItems.push(this.auctionsService.parseSearchResult(item));
        });
      }
    } else {
      const result = await this.post(url, searchOption);

      result.data.Items?.forEach((item) => {
        auctionItems.push(this.auctionsService.parseSearchResult(item));
      });
    }

    return auctionItems;
  }

  async searchMarketItems(query: MarketQueryDto) {
    const url = 'https://developer-lostark.game.onstove.com/markets/items';
    const searchOption: MarketSearchOption =
      this.marketsService.buildSearchOption(query);
    const marketItems: MarketItemDto[] = [];

    if (query.pageAll) {
      let pageNo = 1;

      while (pageNo <= 10) {
        searchOption.PageNo = pageNo++;

        const result = await this.post(url, searchOption);
        if (result.data.Items.length === 0) break;

        result.data.Items.forEach((item) => {
          marketItems.push(this.marketsService.parseSearchResult(item));
        });
      }
    } else {
      const result = await this.post(url, searchOption);

      result.data.Items.forEach((item) => {
        marketItems.push(this.marketsService.parseSearchResult(item));
      });
    }

    return marketItems;
  }
}
