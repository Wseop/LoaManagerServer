import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StatsChaos, StatsChaosSchema } from './schemas/stats-chaos.schema';
import {
  StatsGuardian,
  StatsGuardianSchema,
} from './schemas/stats-guardian.schema';
import {
  StatsSetting,
  StatsSettingSchema,
} from './schemas/stats-setting.schema';
import { StatsSkill, StatsSkillSchema } from './schemas/stats-skill.schema';
import { StatisticsController } from './statistics.controller';
import { StatisticsService } from './statistics.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: StatsChaos.name, schema: StatsChaosSchema },
      { name: StatsGuardian.name, schema: StatsGuardianSchema },
      { name: StatsSetting.name, schema: StatsSettingSchema },
      { name: StatsSkill.name, schema: StatsSkillSchema },
    ]),
  ],
  controllers: [StatisticsController],
  providers: [StatisticsService],
})
export class StatisticsModule {}
