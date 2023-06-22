import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  StatisticChaos,
  StatisticChaosSchema,
} from './schemas/statistic-chaos.schema';
import { StatisticChaosController } from './statistic-chaos.controller';
import { StatisticChaosService } from './statistic-chaos.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: StatisticChaos.name, schema: StatisticChaosSchema },
    ]),
  ],
  controllers: [StatisticChaosController],
  providers: [StatisticChaosService],
  exports: [StatisticChaosService],
})
export class StatisticChaosModule {}
