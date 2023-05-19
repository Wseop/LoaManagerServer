import { Module } from '@nestjs/common';
import { StatisticsController } from './statistics.controller';
import { StatisticsService } from './statistics.service';
import { StatsChaosModule } from './chaos/stats-chaos.module';
import { StatsGuardianModule } from './guardian/stats-guardian.module';
import { StatsSettingModule } from './setting/stats-setting.module';
import { StatsSkillModule } from './skill/stats-skill.module';

@Module({
  imports: [
    StatsChaosModule,
    StatsGuardianModule,
    StatsSettingModule,
    StatsSkillModule,
  ],
  controllers: [StatisticsController],
  providers: [StatisticsService],
})
export class StatisticsModule {}
