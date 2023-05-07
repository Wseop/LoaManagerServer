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
import { ClassDto } from './dto/class.dto';
import { EngraveDto } from './dto/engrave.dto';
import { RewardDto } from './dto/reward.dto';
import { SkillDto } from './dto/skill.dto';

@Controller('resources')
export class ResourcesController {
  constructor(private readonly resourcesService: ResourcesService) {}

  @Get('/class')
  findAllClasses() {
    return this.resourcesService.findAllClasses();
  }

  @UseGuards(AuthGuard('access'))
  @Post('/class')
  createClass(@Body() classDto: ClassDto) {
    return this.resourcesService.createClass(classDto);
  }

  @UseGuards(AuthGuard('access'))
  @Put('/class')
  replaceClass(@Body() classDto: ClassDto) {
    return this.resourcesService.replaceClass(classDto);
  }

  @Get('/engrave')
  findAllEngraves() {
    return this.resourcesService.findAllEngraves();
  }

  @UseGuards(AuthGuard('access'))
  @Post('/engrave')
  createEngrave(@Body() engraveDto: EngraveDto) {
    return this.resourcesService.createEngrave(engraveDto);
  }

  @Get('/reward/:content')
  findRewardByContent(@Param('content') content: string) {
    return this.resourcesService.findRewardByContent(content);
  }

  @UseGuards(AuthGuard('access'))
  @Post('/reward')
  createReward(@Body() rewardDto: RewardDto) {
    return this.resourcesService.createReward(rewardDto);
  }

  @UseGuards(AuthGuard('access'))
  @Put('/reward')
  replaceReward(@Body() rewardDto: RewardDto) {
    return this.resourcesService.replaceReward(rewardDto);
  }

  @Get('/skill/:className')
  findSkillByClass(@Param('className') className: string) {
    return this.resourcesService.findSkillByClass(className);
  }

  @UseGuards(AuthGuard('access'))
  @Post('/skill')
  createSkill(@Body() skillDto: SkillDto) {
    return this.resourcesService.createSkill(skillDto);
  }

  @UseGuards(AuthGuard('access'))
  @Put('/skill')
  replaceSkill(@Body() skillDto: SkillDto) {
    return this.resourcesService.replaceSkill(skillDto);
  }
}
