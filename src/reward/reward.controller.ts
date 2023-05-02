import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { RewardService } from './reward.service';
import { CreateRewardChaosDto } from './dto/createRewardChaos.dto';
import { CreateRewardGuardianDto } from './dto/createRewardGuardian.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('reward')
export class RewardController {
  constructor(private readonly rewardService: RewardService) {}

  @Get('/:category')
  findRewards(@Param('category') category: string) {
    return this.rewardService.findRewards(category);
  }

  @Get('/:category/:level')
  findRewardsByLevel(
    @Param('category') category: string,
    @Param('level') level: string,
  ) {
    return this.rewardService.findRewardsByLevel(category, level);
  }

  @UseGuards(AuthGuard('access'))
  @Post('/chaos')
  createRewardChaos(@Body() createRewardChaosDto: CreateRewardChaosDto) {
    return this.rewardService.createRewardChaos(createRewardChaosDto);
  }

  @UseGuards(AuthGuard('access'))
  @Post('/guardian')
  createRewardGuardian(
    @Body() createRewardGuardianDto: CreateRewardGuardianDto,
  ) {
    return this.rewardService.createRewardGuardian(createRewardGuardianDto);
  }
}
