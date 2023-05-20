import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ChaosReward, ChaosRewardSchema } from './schemas/chaos-reward.schema';
import { ChaosRewardsService } from './chaos-rewards.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ChaosReward.name, schema: ChaosRewardSchema },
    ]),
  ],
  providers: [ChaosRewardsService],
  exports: [ChaosRewardsService],
})
export class ChaosRewardsModule {}
