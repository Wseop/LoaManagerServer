import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { LostarkService } from './lostark.service';
import { CreateApiKeyDto } from './api-keys/dto/create-api-key.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiCreatedResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';

@Controller('lostark')
export class LostarkController {
  constructor(private readonly lostarkService: LostarkService) {}

  @Post('apiKey')
  @UseGuards(AuthGuard('access'))
  @ApiUnauthorizedResponse()
  @ApiCreatedResponse()
  createApiKey(@Body() createApiKey: CreateApiKeyDto) {
    return this.lostarkService.createApiKey(createApiKey);
  }
}
