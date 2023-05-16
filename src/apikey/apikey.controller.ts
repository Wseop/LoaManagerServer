import { Controller, Get } from '@nestjs/common';
import { ApiKeyService } from './apikey.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('apikey')
@Controller('apikey')
export class ApiKeyController {
  constructor(private readonly apiKeyService: ApiKeyService) {}

  @Get()
  @ApiOkResponse()
  findAll() {
    return this.apiKeyService.findAll();
  }
}
