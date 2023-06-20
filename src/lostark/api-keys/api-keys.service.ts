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

  async createApiKey(createApiKeyDto: CreateApiKeyDto): Promise<ApiKey> {
    const newApiKey: ApiKey = {
      index: await this.apiKeyModel.countDocuments(),
      apiKey: createApiKeyDto.apiKey,
    };
    const result = await this.apiKeyModel.create(newApiKey);

    return { index: result.index, apiKey: result.apiKey };
  }

  async getNextKeyIndex(): Promise<number> {
    if ((await this.apiKeyModel.estimatedDocumentCount()) <= this.apiKeyIndex) {
      this.apiKeyIndex = 0;
    }

    return this.apiKeyIndex++;
  }

  async getApiKey(): Promise<string> {
    return (
      await this.apiKeyModel.findOne({
        index: await this.getNextKeyIndex(),
      })
    ).apiKey;
  }
}
