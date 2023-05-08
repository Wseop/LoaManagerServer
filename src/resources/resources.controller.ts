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

@Controller('resources')
export class ResourcesController {
  constructor(private readonly resourcesService: ResourcesService) {}

  @Get('/:category')
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
  createClass(@Body() classDto: ClassDto) {
    return this.resourcesService.createResource('class', classDto);
  }

  @UseGuards(AuthGuard('access'))
  @Put('/class')
  replaceClass(@Body() classDto: ClassDto) {
    return this.resourcesService.replaceClass(classDto);
  }

  @UseGuards(AuthGuard('access'))
  @Post('/engrave')
  createEngrave(@Body() engraveDto: EngraveDto) {
    return this.resourcesService.createResource('engrave', engraveDto);
  }

  @UseGuards(AuthGuard('access'))
  @Post('/reward')
  createReward(@Body() rewardDto: RewardDto) {
    return this.resourcesService.createResource('reward', rewardDto);
  }

  @UseGuards(AuthGuard('access'))
  @Put('/reward')
  replaceReward(@Body() rewardDto: RewardDto) {
    return this.resourcesService.replaceReward(rewardDto);
  }

  @UseGuards(AuthGuard('access'))
  @Post('/skill')
  createSkill(@Body() skillDto: SkillDto) {
    return this.resourcesService.createResource('skill', skillDto);
  }

  @UseGuards(AuthGuard('access'))
  @Put('/skill')
  replaceSkill(@Body() skillDto: SkillDto) {
    return this.resourcesService.replaceSkill(skillDto);
  }
}
