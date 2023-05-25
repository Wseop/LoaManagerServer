import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ApiKey } from './schemas/api-key.schema';
import { Model } from 'mongoose';
import { CreateApiKeyDto } from './dto/create-api-key.dto';

@Injectable()
export class ApiKeysService {
  apiKeyIndex: number;

  constructor(
    @InjectModel(ApiKey.name)
    private readonly apiKeyModel: Model<ApiKey>,
  ) {
    this.apiKeyIndex = 0;
  }

  async createApiKey(createApiKeyDto: CreateApiKeyDto) {
    const newApiKey: ApiKey = {
      index: await this.apiKeyModel.countDocuments(),
      apiKey: createApiKeyDto.apiKey,
    };

    return await this.apiKeyModel.create(newApiKey);
  }

  async getNextKeyIndex() {
    if ((await this.apiKeyModel.estimatedDocumentCount()) <= this.apiKeyIndex) {
      this.apiKeyIndex = 0;
    }

    return this.apiKeyIndex++;
  }

  async getApiKey() {
    return (
      await this.apiKeyModel.findOne({
        index: await this.getNextKeyIndex(),
      })
    ).apiKey;
  }
}
