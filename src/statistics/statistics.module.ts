import { Module } from '@nestjs/common';
import { StatisticChaosModule } from './statistic-chaos/statistic-chaos.module';
import { StatisticGuardianModule } from './statistic-guardian/statistic-guardian.module';
import { StatisticSkillModule } from './statistic-skill/statistic-skill.module';
import { StatisticProfileModule } from './statistic-profile/statistic-profile.module';

@Module({
  imports: [
    StatisticChaosModule,
    StatisticGuardianModule,
    StatisticProfileModule,
    StatisticSkillModule,
  ],
})
export class StatisticsModule {}
