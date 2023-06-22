import { Body, Controller, Get, Post, Put, UseGuards } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { EngraveService } from './engrave.service';
import { EngraveDto } from './dto/engrave.dto';
import { AuthGuard } from '@nestjs/passport';
import { CreateEngraveDto } from './dto/create-engrave.dto';

@ApiTags('[Resources] engrave')
@Controller('resources/engrave')
export class EngraveController {
  constructor(private readonly engraveService: EngraveService) {}

  @Get()
  @ApiOkResponse({ type: [EngraveDto] })
  findEngraves(): Promise<EngraveDto[]> {
    return this.engraveService.findEngraves();
  }

  @Post()
  @UseGuards(AuthGuard('access'))
  @ApiUnauthorizedResponse({ description: 'valid jwt required' })
  @ApiBadRequestResponse({ description: 'invalid body' })
  @ApiCreatedResponse({ type: EngraveDto })
  @ApiBearerAuth()
  createEngrave(
    @Body() createEngraveDto: CreateEngraveDto,
  ): Promise<EngraveDto> {
    return this.engraveService.createEngrave(createEngraveDto);
  }

  @Put()
  @UseGuards(AuthGuard('access'))
  @ApiUnauthorizedResponse({ description: 'valid jwt required' })
  @ApiBadRequestResponse({ description: 'invalid body' })
  @ApiCreatedResponse({ type: EngraveDto })
  @ApiBearerAuth()
  replaceEngrave(
    @Body() createEngraveDto: CreateEngraveDto,
  ): Promise<EngraveDto> {
    return this.engraveService.replaceEngrave(createEngraveDto);
  }
}
