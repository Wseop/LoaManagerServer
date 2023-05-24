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

@Injectable()
export class LostarkService {
  constructor(
    private readonly apiKeysService: ApiKeysService,
    private readonly charactersService: CharactersService,
    private readonly auctionsService: AuctionsService,
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
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async getCharacterInfo(characterName: string) {
    const result = await this.get(
      `https://developer-lostark.game.onstove.com/armories/characters/${characterName}?filters=profiles%2Bequipment%2Bcombat-skills%2Bengravings%2Bcards%2Bgems%2Bcollectibles`,
    );

    if (result.status === HttpStatus.TOO_MANY_REQUESTS) {
      throw new HttpException(
        'API request limit',
        HttpStatus.TOO_MANY_REQUESTS,
      );
    } else if (result.data === null) {
      return null;
    } else {
      return await this.charactersService.parseCharacter(result.data);
    }
  }

  async getSiblings(characterName: string) {
    const result = await this.get(
      `https://developer-lostark.game.onstove.com/characters/${characterName}/siblings`,
    );

    if (result.status === HttpStatus.TOO_MANY_REQUESTS) {
      throw new HttpException(
        'API request limit',
        HttpStatus.TOO_MANY_REQUESTS,
      );
    } else if (result.data === null) {
      return null;
    } else {
      return await this.charactersService.parseSiblings(result.data);
    }
  }

  async searchAuctionItems(query: AuctionQueryDto) {
    const result = await this.post(
      'https://developer-lostark.game.onstove.com/auctions/items',
      this.auctionsService.buildSearchOption(query),
    );

    return this.auctionsService.parseSearchResult(result.data.Items[0]);
  }
}
