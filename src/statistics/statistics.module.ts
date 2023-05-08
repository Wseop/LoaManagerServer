import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StatsChaos, StatsChaosSchema } from './schemas/statsChaos.schema';
import {
  StatsGuardian,
  StatsGuardianSchema,
} from './schemas/statsGuardian.schema';
import {
  StatsSetting,
  StatsSettingSchema,
} from './schemas/statsSetting.schema';
import { StatsSkill, StatsSkillSchema } from './schemas/statsSkill.schema';
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
