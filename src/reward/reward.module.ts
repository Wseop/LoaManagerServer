import { Module } from '@nestjs/common';
import { RewardController } from './reward.controller';
import { RewardService } from './reward.service';
import { MongooseModule } from '@nestjs/mongoose';
import { RewardChaos, RewardChaosSchema } from './schemas/rewardChaos.schema';
import {
  RewardGuardian,
  RewardGuardianSchema,
} from './schemas/rewardGuardian.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: RewardChaos.name, schema: RewardChaosSchema },
      { name: RewardGuardian.name, schema: RewardGuardianSchema },
    ]),
  ],
  controllers: [RewardController],
  providers: [RewardService],
})
export class RewardModule {}
