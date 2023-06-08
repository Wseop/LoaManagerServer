import { Module } from '@nestjs/common';
import { StatisticsController } from './statistics.controller';
import { StatisticsService } from './statistics.service';
import { ChaosRewardsModule } from './chaos-rewards/chaos-rewards.module';
import { GuardianRewardsModule } from './guardian-rewards/guardian-rewards.module';
import { SkillSettingsModule } from './skill-settings/skill-settings.module';
import { EngraveModule } from 'src/resources/engrave/engrave.module';

@Module({
  imports: [
    ChaosRewardsModule,
    GuardianRewardsModule,
    SkillSettingsModule,
    EngraveModule,
  ],
  controllers: [StatisticsController],
  providers: [StatisticsService],
})
export class StatisticsModule {}
