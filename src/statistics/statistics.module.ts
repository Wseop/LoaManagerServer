import { Module } from '@nestjs/common';
import { StatisticAbilityModule } from './statistic-ability/statistic-ability.module';
import { StatisticChaosModule } from './statistic-chaos/statistic-chaos.module';
import { StatisticGuardianModule } from './statistic-guardian/statistic-guardian.module';
import { StatisticElixirModule } from './statistic-elixir/statistic-elixir.module';
import { StatisticSetModule } from './statistic-set/statistic-set.module';
import { StatisticEngraveModule } from './statistic-engrave/statistic-engrave.module';
import { StatisticSkillModule } from './statistic-skill/statistic-skill.module';

@Module({
  imports: [
    StatisticChaosModule,
    StatisticGuardianModule,
    StatisticAbilityModule,
    StatisticElixirModule,
    StatisticSetModule,
    StatisticEngraveModule,
    StatisticSkillModule,
  ],
})
export class StatisticsModule {}
