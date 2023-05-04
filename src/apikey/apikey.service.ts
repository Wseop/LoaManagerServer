import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ApiKey } from './schemas/apikey.schema';
import { Model } from 'mongoose';

@Injectable()
export class ApiKeyService {
  constructor(
    @InjectModel(ApiKey.name)
    private readonly apiKeyModel: Model<ApiKey>,
  ) {}

  async findAll() {
    return await this.apiKeyModel.find();
  }
}
