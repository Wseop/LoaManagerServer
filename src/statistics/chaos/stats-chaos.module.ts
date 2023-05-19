import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StatsChaos, StatsChaosSchema } from './schemas/stats-chaos.schema';
import { StatsChaosService } from './stats-chaos.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: StatsChaos.name, schema: StatsChaosSchema },
    ]),
  ],
  providers: [StatsChaosService],
  exports: [StatsChaosService],
})
export class StatsChaosModule {}
