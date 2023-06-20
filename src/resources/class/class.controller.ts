import { Body, Controller, Get, Post, Put, UseGuards } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ClassService } from './class.service';
import { ClassDto } from './dto/class.dto';
import { AuthGuard } from '@nestjs/passport';
import { CreateClassDto } from './dto/create-class.dto';

@ApiTags('[Resources] class')
@Controller('resources/class')
export class ClassController {
  constructor(private readonly classService: ClassService) {}

  @Get()
  @ApiOkResponse({ type: [ClassDto] })
  findClasses(): Promise<ClassDto[]> {
    return this.classService.findClasses();
  }

  @Post()
  @UseGuards(AuthGuard('access'))
  @ApiUnauthorizedResponse({ description: 'valid jwt required' })
  @ApiBadRequestResponse({ description: 'invalid body' })
  @ApiCreatedResponse({ type: ClassDto })
  @ApiBearerAuth()
  createClass(@Body() createClassDto: CreateClassDto): Promise<ClassDto> {
    return this.classService.createClass(createClassDto);
  }

  @Put()
  @UseGuards(AuthGuard('access'))
  @ApiUnauthorizedResponse({ description: 'valid jwt required' })
  @ApiBadRequestResponse({ description: 'invalid body' })
  @ApiCreatedResponse({ type: ClassDto })
  @ApiBearerAuth()
  replaceClass(@Body() createClassDto: CreateClassDto): Promise<ClassDto> {
    return this.classService.replaceClass(createClassDto);
  }
}
