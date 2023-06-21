import { Module } from '@nestjs/common';
import { StatisticAbilityModule } from './statistic-ability/statistic-ability.module';
import { StatisticChaosModule } from './statistic-chaos/statistic-chaos.module';
import { StatisticGuardianModule } from './statistic-guardian/statistic-guardian.module';
import { StatisticElixirModule } from './statistic-elixir/statistic-elixir.module';

@Module({
  imports: [
    StatisticChaosModule,
    StatisticGuardianModule,
    StatisticAbilityModule,
    StatisticElixirModule,
  ],
})
export class StatisticsModule {}
