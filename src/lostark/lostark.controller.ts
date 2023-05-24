import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { LostarkService } from './lostark.service';
import { CreateApiKeyDto } from './api-keys/dto/create-api-key.dto';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiServiceUnavailableResponse,
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
  @ApiServiceUnavailableResponse({
    description: 'Lostark api server is under maintenance',
  })
  getCharacterInfo(@Param('characterName') characterName: string) {
    return this.lostarkService.getCharacterInfo(characterName);
  }

  @Get('/characters/:characterName/siblings')
  @ApiOkResponse()
  @ApiTooManyRequestsResponse()
  @ApiServiceUnavailableResponse({
    description: 'Lostark api server is under maintenance',
  })
  getSiblings(@Param('characterName') characterName: string) {
    return this.lostarkService.getSiblings(characterName);
  }
}
