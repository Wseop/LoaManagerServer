import { Controller, Get } from '@nestjs/common';
import { ApiKeyService } from './apikey.service';

@Controller('apikey')
export class ApiKeyController {
  constructor(private readonly apiKeyService: ApiKeyService) {}

  @Get()
  findAll() {
    return this.apiKeyService.findAll();
  }
}
