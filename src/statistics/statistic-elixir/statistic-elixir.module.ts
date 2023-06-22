import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  ElixirSetting,
  ElixirSettingSchema,
} from './schemas/elixir-setting.schema';
import { StatisticElixirController } from './statistic-elixir.controller';
import { StatisticElixirService } from './statistic-elixir.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ElixirSetting.name, schema: ElixirSettingSchema },
    ]),
  ],
  controllers: [StatisticElixirController],
  providers: [StatisticElixirService],
  exports: [StatisticElixirService],
})
export class StatisticElixirModule {}
