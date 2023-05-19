import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  StatsSetting,
  StatsSettingSchema,
} from './schemas/stats-setting.schema';
import { StatsSettingService } from './stats-setting.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: StatsSetting.name, schema: StatsSettingSchema },
    ]),
  ],
  providers: [StatsSettingService],
  exports: [StatsSettingService],
})
export class StatsSettingModule {}
