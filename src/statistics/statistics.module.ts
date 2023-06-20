import { Module } from '@nestjs/common';
import { StatisticAbilityModule } from './statistic-ability/statistic-ability.module';

@Module({
  imports: [StatisticAbilityModule],
})
export class StatisticsModule {}
