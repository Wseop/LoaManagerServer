import {
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

@Injectable()
export class LostarkService {
  constructor(
    private readonly apiKeysService: ApiKeysService,
    private readonly charactersService: CharactersService,
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
          'Lostark server is under maintenance',
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
}
