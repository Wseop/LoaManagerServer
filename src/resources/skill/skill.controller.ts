import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { SkillService } from './skill.service';
import { SkillDto } from './dto/skill.dto';
import { AuthGuard } from '@nestjs/passport';
import { CreateSkillDto } from './dto/create-skill.dto';

@ApiTags('[Resources] skill')
@Controller('resources/skill')
export class SkillController {
  constructor(private readonly skillService: SkillService) {}

  @Get()
  @ApiOkResponse({ type: [SkillDto] })
  findSkills(): Promise<SkillDto[]> {
    return this.skillService.findSkills();
  }

  @Get('/:className')
  @ApiParam({ name: 'className', required: true, example: '버서커' })
  @ApiOkResponse({ type: SkillDto })
  findSkillByClassName(
    @Param('className') className: string,
  ): Promise<SkillDto> {
    return this.skillService.findSkillByClassName(className);
  }

  @Post()
  @UseGuards(AuthGuard('access'))
  @ApiUnauthorizedResponse({ description: 'valid jwt required' })
  @ApiBadRequestResponse({ description: 'invalid body' })
  @ApiCreatedResponse({ type: SkillDto })
  @ApiBearerAuth()
  createSkill(@Body() createSkillDto: CreateSkillDto): Promise<SkillDto> {
    return this.skillService.createSkill(createSkillDto);
  }

  @Put()
  @UseGuards(AuthGuard('access'))
  @ApiUnauthorizedResponse({ description: 'valid jwt required' })
  @ApiBadRequestResponse({ description: 'invalid body' })
  @ApiCreatedResponse({ type: SkillDto })
  @ApiBearerAuth()
  replaceSkill(@Body() createSkillDto: CreateSkillDto): Promise<SkillDto> {
    return this.skillService.replaceSkill(createSkillDto);
  }
}
