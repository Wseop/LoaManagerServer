import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  AbilitySetting,
  AbilitySettingSchema,
} from './schemas/ability-settings.schema';
import { StatisticAbilityService } from './statistic-ability.service';
import { StatisticAbilityController } from './statistic-ability.controller';
import { EngraveModule } from 'src/resources/engrave/engrave.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AbilitySetting.name, schema: AbilitySettingSchema },
    ]),
    EngraveModule,
  ],
  controllers: [StatisticAbilityController],
  providers: [StatisticAbilityService],
  exports: [StatisticAbilityService],
})
export class StatisticAbilityModule {}
