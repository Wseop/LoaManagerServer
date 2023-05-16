import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ResourcesService } from './resources.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateClassDto } from './dto/create-class.dto';
import { CreateEngraveDto } from './dto/create-engrave.dto';
import { CreateRewardDto } from './dto/create-reward.dto';
import { CreateSkillDto } from './dto/create-skill.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ResourceCategory } from './enums/resource-category.enum';

@ApiTags('resources')
@Controller('resources')
export class ResourcesController {
  constructor(private readonly resourcesService: ResourcesService) {}

  @Get('/:category')
  @ApiBadRequestResponse({ description: 'invalid category' })
  @ApiOkResponse()
  findResources(@Param('category') category: string) {
    if (
      category !== ResourceCategory.Class &&
      category !== ResourceCategory.Engrave &&
      category !== ResourceCategory.Reward &&
      category !== ResourceCategory.Skill
    ) {
      throw new BadRequestException();
    } else {
      return this.resourcesService.findResources(category);
    }
  }

  @Get('/:category/:filter')
  @ApiBadRequestResponse({ description: 'invalid category' })
  @ApiOkResponse()
  findResourcesByFilter(
    @Param('category') category: string,
    @Param('filter') filter: string,
  ) {
    if (category === ResourceCategory.Reward) {
      return this.resourcesService.findRewardByContent(filter);
    } else if (category === ResourceCategory.Skill) {
      return this.resourcesService.findSkillByClass(filter);
    } else {
      throw new BadRequestException();
    }
  }

  @UseGuards(AuthGuard('access'))
  @Post('/class')
  @ApiUnauthorizedResponse({ description: 'valid jwt required' })
  @ApiBadRequestResponse({ description: 'invalid body' })
  @ApiCreatedResponse()
  createClass(@Body() createClassDto: CreateClassDto) {
    return this.resourcesService.createResource(
      ResourceCategory.Class,
      createClassDto,
    );
  }

  @UseGuards(AuthGuard('access'))
  @Put('/class')
  @ApiUnauthorizedResponse({ description: 'valid jwt required' })
  @ApiBadRequestResponse({ description: 'invalid body' })
  @ApiCreatedResponse()
  replaceClass(@Body() createClassDto: CreateClassDto) {
    return this.resourcesService.replaceClass(createClassDto);
  }

  @UseGuards(AuthGuard('access'))
  @Post('/engrave')
  @ApiUnauthorizedResponse({ description: 'valid jwt required' })
  @ApiBadRequestResponse({ description: 'invalid body' })
  @ApiCreatedResponse()
  createEngrave(@Body() createEngraveDto: CreateEngraveDto) {
    return this.resourcesService.createResource(
      ResourceCategory.Engrave,
      createEngraveDto,
    );
  }

  @UseGuards(AuthGuard('access'))
  @Post('/reward')
  @ApiUnauthorizedResponse({ description: 'valid jwt required' })
  @ApiBadRequestResponse({ description: 'invalid body' })
  @ApiCreatedResponse()
  createReward(@Body() createRewardDto: CreateRewardDto) {
    return this.resourcesService.createResource(
      ResourceCategory.Reward,
      createRewardDto,
    );
  }

  @UseGuards(AuthGuard('access'))
  @Put('/reward')
  @ApiUnauthorizedResponse({ description: 'valid jwt required' })
  @ApiBadRequestResponse({ description: 'invalid body' })
  @ApiCreatedResponse()
  replaceReward(@Body() createRewardDto: CreateRewardDto) {
    return this.resourcesService.replaceReward(createRewardDto);
  }

  @UseGuards(AuthGuard('access'))
  @Post('/skill')
  @ApiUnauthorizedResponse({ description: 'valid jwt required' })
  @ApiBadRequestResponse({ description: 'invalid body' })
  @ApiCreatedResponse()
  createSkill(@Body() createSkillDto: CreateSkillDto) {
    return this.resourcesService.createResource(
      ResourceCategory.Skill,
      createSkillDto,
    );
  }

  @UseGuards(AuthGuard('access'))
  @Put('/skill')
  @ApiUnauthorizedResponse({ description: 'valid jwt required' })
  @ApiBadRequestResponse({ description: 'invalid body' })
  @ApiCreatedResponse()
  replaceSkill(@Body() createSkillDto: CreateSkillDto) {
    return this.resourcesService.replaceSkill(createSkillDto);
  }
}
