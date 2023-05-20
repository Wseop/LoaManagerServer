import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  GuardianReward,
  GuardianRewardSchema,
} from './schemas/guardian-reward.schema';
import { GuardianRewardsService } from './guardian-rewards.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: GuardianReward.name, schema: GuardianRewardSchema },
    ]),
  ],
  providers: [GuardianRewardsService],
  exports: [GuardianRewardsService],
})
export class GuardianRewardsModule {}
