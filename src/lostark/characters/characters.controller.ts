import { Controller, Get, Param } from '@nestjs/common';
import {
  ApiOkResponse,
  ApiParam,
  ApiServiceUnavailableResponse,
  ApiTags,
  ApiTooManyRequestsResponse,
} from '@nestjs/swagger';
import { CharactersService } from './characters.service';
import { CharacterInfoDto } from './dto/characterInfo.dto';
import { SiblingDto } from './dto/sibling.dto';

@ApiTags('Lostark - Characters')
@Controller('lostark/characters')
export class CharactersController {
  constructor(private readonly charactersService: CharactersService) {}

  @Get('/:characterName')
  @ApiParam({
    name: 'characterName',
    required: true,
    example: '쿠키바닐라쉐이크',
  })
  @ApiOkResponse({ type: CharacterInfoDto })
  @ApiTooManyRequestsResponse({ description: 'API request limit' })
  @ApiServiceUnavailableResponse({
    description: 'Lostark api server is under maintenance',
  })
  getCharacterInfo(
    @Param('characterName') characterName: string,
  ): Promise<CharacterInfoDto> {
    return this.charactersService.getCharacterInfo(characterName);
  }

  @Get('/characters/:characterName/siblings')
  @ApiParam({
    name: 'characterName',
    required: true,
    example: '쿠키바닐라쉐이크',
  })
  @ApiOkResponse({ type: [SiblingDto] })
  @ApiTooManyRequestsResponse({ description: 'API request limit' })
  @ApiServiceUnavailableResponse({
    description: 'Lostark api server is under maintenance',
  })
  getSiblings(
    @Param('characterName') characterName: string,
  ): Promise<SiblingDto[]> {
    return this.charactersService.getSiblings(characterName);
  }
}
