import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SetSetting, SetSettingSchema } from './schemas/set-setting.schema';
import { StatisticSetService } from './statistic-set.service';
import { StatisticSetController } from './statistic-set.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SetSetting.name, schema: SetSettingSchema },
    ]),
  ],
  controllers: [StatisticSetController],
  providers: [StatisticSetService],
  exports: [StatisticSetService],
})
export class StatisticSetModule {}
