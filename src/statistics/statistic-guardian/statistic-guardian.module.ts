import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  StatisticGuardian,
  StatisticGuardianSchema,
} from './schemas/statistic-guardian.schema';
import { StatisticGuardianController } from './statistic-guardian.controller';
import { StatisticGuardianService } from './statistic-guardian.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: StatisticGuardian.name, schema: StatisticGuardianSchema },
    ]),
  ],
  controllers: [StatisticGuardianController],
  providers: [StatisticGuardianService],
  exports: [StatisticGuardianService],
})
export class StatisticGuardianModule {}
