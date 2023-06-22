import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  EngraveSetting,
  EngraveSettingSchema,
} from './schemas/engrave-setting.schema';
import { StatisticEngraveController } from './statistic-engrave.controller';
import { StatisticEngraveService } from './statistic-engrave.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: EngraveSetting.name, schema: EngraveSettingSchema },
    ]),
  ],
  controllers: [StatisticEngraveController],
  providers: [StatisticEngraveService],
  exports: [StatisticEngraveService],
})
export class StatisticEngraveModule {}
