import { Module } from '@nestjs/common';
import { StatisticAbilityModule } from './statistic-ability/statistic-ability.module';
import { StatisticChaosModule } from './statistic-chaos/statistic-chaos.module';
import { StatisticGuardianModule } from './statistic-guardian/statistic-guardian.module';

@Module({
  imports: [
    StatisticChaosModule,
    StatisticGuardianModule,
    StatisticAbilityModule,
  ],
})
export class StatisticsModule {}
