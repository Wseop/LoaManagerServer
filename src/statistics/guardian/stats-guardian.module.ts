import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  StatsGuardian,
  StatsGuardianSchema,
} from './schemas/stats-guardian.schema';
import { StatsGuardianService } from './stats-guardian.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: StatsGuardian.name, schema: StatsGuardianSchema },
    ]),
  ],
  providers: [StatsGuardianService],
  exports: [StatsGuardianService],
})
export class StatsGuardianModule {}
