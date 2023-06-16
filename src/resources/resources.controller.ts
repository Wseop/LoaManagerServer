import {
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
import { CreateClassDto } from './class/dto/create-class.dto';
import { CreateEngraveDto } from './engrave/dto/create-engrave.dto';
import { CreateRewardDto } from './reward/dto/create-reward.dto';
import { CreateSkillDto } from './skill/dto/create-skill.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ResourceCategory } from './enums/resource-category.enum';

@ApiTags('Resources')
@Controller('resources')
export class ResourcesController {
  constructor(private readonly resourcesService: ResourcesService) {}

  @Get('/class')
  @ApiOkResponse()
  findClasses() {
    return this.resourcesService.findResources(ResourceCategory.Class);
  }

  @Get('/engrave')
  @ApiOkResponse()
  findEngraves() {
    return this.resourcesService.findResources(ResourceCategory.Engrave);
  }

  @Get('/reward')
  @ApiOkResponse()
  findRewards() {
    return this.resourcesService.findResources(ResourceCategory.Reward);
  }

  @Get('/reward/:content')
  @ApiOkResponse()
  findRewardByContent(@Param('content') content: string) {
    return this.resourcesService.findRewardByContent(content);
  }

  @Get('/skill')
  @ApiOkResponse()
  findSkills() {
    return this.resourcesService.findResources(ResourceCategory.Skill);
  }

  @Get('/skill/:className')
  @ApiOkResponse()
  findSkillByClassName(@Param('className') className: string) {
    return this.resourcesService.findSkillByClassName(className);
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
    return this.resourcesService.replaceResource(
      ResourceCategory.Class,
      createClassDto,
    );
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
  @Put('/engrave')
  @ApiUnauthorizedResponse({ description: 'valid jwt required' })
  @ApiBadRequestResponse({ description: 'invalid body' })
  @ApiCreatedResponse()
  replaceEngrave(@Body() createEngraveDto: CreateEngraveDto) {
    return this.resourcesService.replaceResource(
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
    return this.resourcesService.replaceResource(
      ResourceCategory.Reward,
      createRewardDto,
    );
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
    return this.resourcesService.replaceResource(
      ResourceCategory.Skill,
      createSkillDto,
    );
  }
}
