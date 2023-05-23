import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { LostarkService } from './lostark.service';
import { CreateApiKeyDto } from './api-keys/dto/create-api-key.dto';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
  ApiTooManyRequestsResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@ApiTags('lostark')
@Controller('lostark')
export class LostarkController {
  constructor(private readonly lostarkService: LostarkService) {}

  @Post('/apiKey')
  @UseGuards(AuthGuard('access'))
  @ApiUnauthorizedResponse()
  @ApiCreatedResponse()
  createApiKey(@Body() createApiKey: CreateApiKeyDto) {
    return this.lostarkService.createApiKey(createApiKey);
  }

  @Get('/characters/:characterName')
  @ApiOkResponse()
  @ApiTooManyRequestsResponse()
  getCharacterInfo(@Param('characterName') characterName: string) {
    return this.lostarkService.getCharacterInfo(characterName);
  }

  @Get('/characters/:characterName/siblings')
  @ApiOkResponse()
  @ApiTooManyRequestsResponse()
  getSiblings(@Param('characterName') characterName: string) {
    return this.lostarkService.getSiblings(characterName);
  }
}
