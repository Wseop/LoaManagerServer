import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  AbilitySetting,
  AbilitySettingSchema,
} from './schemas/ability-setting.schema';
import { StatisticAbilityService } from './statistic-ability.service';
import { StatisticAbilityController } from './statistic-ability.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AbilitySetting.name, schema: AbilitySettingSchema },
    ]),
  ],
  controllers: [StatisticAbilityController],
  providers: [StatisticAbilityService],
  exports: [StatisticAbilityService],
})
export class StatisticAbilityModule {}
