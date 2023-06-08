import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  AbilitySetting,
  AbilitySettingSchema,
} from './schemas/ability-setting.schema';
import { AbilitySettingsService } from './ability-settings.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AbilitySetting.name, schema: AbilitySettingSchema },
    ]),
  ],
  providers: [AbilitySettingsService],
  exports: [AbilitySettingsService],
})
export class AbilitySettingsModule {}
