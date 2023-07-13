import { Module } from '@nestjs/common';
import { StatisticSkillModule } from './statistic-skill/statistic-skill.module';
import { StatisticProfileModule } from './statistic-profile/statistic-profile.module';

@Module({
  imports: [StatisticProfileModule, StatisticSkillModule],
})
export class StatisticsModule {}
