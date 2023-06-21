import { Module } from '@nestjs/common';
import { StatisticAbilityModule } from './statistic-ability/statistic-ability.module';
import { StatisticChaosModule } from './statistic-chaos/statistic-chaos.module';
import { StatisticGuardianModule } from './statistic-guardian/statistic-guardian.module';
import { StatisticElixirModule } from './statistic-elixir/statistic-elixir.module';
import { StatisticSetModule } from './statistic-set/statistic-set.module';
import { StatisticEngraveModule } from './statistic-engrave/statistic-engrave.module';

@Module({
  imports: [
    StatisticChaosModule,
    StatisticGuardianModule,
    StatisticAbilityModule,
    StatisticElixirModule,
    StatisticSetModule,
    StatisticEngraveModule,
  ],
})
export class StatisticsModule {}
