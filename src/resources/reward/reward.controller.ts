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
import { RewardService } from './reward.service';
import { RewardDto } from './dto/reward.dto';
import { AuthGuard } from '@nestjs/passport';
import { CreateRewardDto } from './dto/create-reward.dto';

@ApiTags('[Resources] reward')
@Controller('resources/reward')
export class RewardController {
  constructor(private readonly rewardService: RewardService) {}

  @Get()
  @ApiOkResponse({ type: [RewardDto] })
  findRewards(): Promise<RewardDto[]> {
    return this.rewardService.findRewards();
  }

  @Get('/:content')
  @ApiParam({ name: 'content', required: true, example: '혼돈의 상아탑(하드)' })
  @ApiOkResponse({ type: RewardDto })
  findRewardByContent(@Param('content') content: string): Promise<RewardDto> {
    return this.rewardService.findRewardByContent(content);
  }

  @Post()
  @UseGuards(AuthGuard('access'))
  @ApiUnauthorizedResponse({ description: 'valid jwt required' })
  @ApiBadRequestResponse({ description: 'invalid body' })
  @ApiCreatedResponse({ type: RewardDto })
  @ApiBearerAuth()
  createReward(@Body() createRewardDto: CreateRewardDto): Promise<RewardDto> {
    return this.rewardService.createReward(createRewardDto);
  }

  @Put()
  @UseGuards(AuthGuard('access'))
  @ApiUnauthorizedResponse({ description: 'valid jwt required' })
  @ApiBadRequestResponse({ description: 'invalid body' })
  @ApiCreatedResponse({ type: RewardDto })
  @ApiBearerAuth()
  replaceReward(@Body() createRewardDto: CreateRewardDto): Promise<RewardDto> {
    return this.rewardService.replaceReward(createRewardDto);
  }
}
