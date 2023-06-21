import { Module } from '@nestjs/common';
import { StatisticAbilityModule } from './statistic-ability/statistic-ability.module';
import { StatisticChaosModule } from './statistic-chaos/statistic-chaos.module';

@Module({
  imports: [StatisticChaosModule, StatisticAbilityModule],
})
export class StatisticsModule {}
