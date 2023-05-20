import { Module } from '@nestjs/common';
import { StatisticsController } from './statistics.controller';
import { StatisticsService } from './statistics.service';
import { ChaosRewardsModule } from './chaos-rewards/chaos-rewards.module';
import { GuardianRewardsModule } from './guardian-rewards/guardian-rewards.module';
import { ArmorySettingsModule } from './armory-settings/armory-settings.module';
import { SkillSettingsModule } from './skill-settings/skill-settings.module';

@Module({
  imports: [
    ChaosRewardsModule,
    GuardianRewardsModule,
    ArmorySettingsModule,
    SkillSettingsModule,
  ],
  controllers: [StatisticsController],
  providers: [StatisticsService],
})
export class StatisticsModule {}
