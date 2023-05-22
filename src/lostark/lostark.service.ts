import { Injectable } from '@nestjs/common';
import { ApiKeysService } from './api-keys/api-keys.service';
import { CreateApiKeyDto } from './api-keys/dto/create-api-key.dto';

@Injectable()
export class LostarkService {
  constructor(private readonly apiKeysService: ApiKeysService) {}

  async getApiKey() {
    return await this.apiKeysService.getApiKey();
  }
  async createApiKey(createApiKeyDto: CreateApiKeyDto) {
    return await this.apiKeysService.createApiKey(createApiKeyDto);
  }
}
