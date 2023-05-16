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
import { ClassDto } from './dto/class.dto';
import { EngraveDto } from './dto/engrave.dto';
import { RewardDto } from './dto/reward.dto';
import { SkillDto } from './dto/skill.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@ApiTags('resources')
@Controller('resources')
export class ResourcesController {
  constructor(private readonly resourcesService: ResourcesService) {}

  @Get('/:category')
  @ApiBadRequestResponse({ description: 'invalid category' })
  @ApiOkResponse()
  findResources(@Param('category') category: string) {
    if (
      category !== 'class' &&
      category !== 'engrave' &&
      category !== 'reward' &&
      category !== 'skill'
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
    if (category === 'reward') {
      return this.resourcesService.findRewardByContent(filter);
    } else if (category === 'skill') {
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
  createClass(@Body() classDto: ClassDto) {
    return this.resourcesService.createResource('class', classDto);
  }

  @UseGuards(AuthGuard('access'))
  @Put('/class')
  @ApiUnauthorizedResponse({ description: 'valid jwt required' })
  @ApiBadRequestResponse({ description: 'invalid body' })
  @ApiCreatedResponse()
  replaceClass(@Body() classDto: ClassDto) {
    return this.resourcesService.replaceClass(classDto);
  }

  @UseGuards(AuthGuard('access'))
  @Post('/engrave')
  @ApiUnauthorizedResponse({ description: 'valid jwt required' })
  @ApiBadRequestResponse({ description: 'invalid body' })
  @ApiCreatedResponse()
  createEngrave(@Body() engraveDto: EngraveDto) {
    return this.resourcesService.createResource('engrave', engraveDto);
  }

  @UseGuards(AuthGuard('access'))
  @Post('/reward')
  @ApiUnauthorizedResponse({ description: 'valid jwt required' })
  @ApiBadRequestResponse({ description: 'invalid body' })
  @ApiCreatedResponse()
  createReward(@Body() rewardDto: RewardDto) {
    return this.resourcesService.createResource('reward', rewardDto);
  }

  @UseGuards(AuthGuard('access'))
  @Put('/reward')
  @ApiUnauthorizedResponse({ description: 'valid jwt required' })
  @ApiBadRequestResponse({ description: 'invalid body' })
  @ApiCreatedResponse()
  replaceReward(@Body() rewardDto: RewardDto) {
    return this.resourcesService.replaceReward(rewardDto);
  }

  @UseGuards(AuthGuard('access'))
  @Post('/skill')
  @ApiUnauthorizedResponse({ description: 'valid jwt required' })
  @ApiBadRequestResponse({ description: 'invalid body' })
  @ApiCreatedResponse()
  createSkill(@Body() skillDto: SkillDto) {
    return this.resourcesService.createResource('skill', skillDto);
  }

  @UseGuards(AuthGuard('access'))
  @Put('/skill')
  @ApiUnauthorizedResponse({ description: 'valid jwt required' })
  @ApiBadRequestResponse({ description: 'invalid body' })
  @ApiCreatedResponse()
  replaceSkill(@Body() skillDto: SkillDto) {
    return this.resourcesService.replaceSkill(skillDto);
  }
}
