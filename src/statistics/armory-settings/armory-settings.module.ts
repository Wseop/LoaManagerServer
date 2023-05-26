import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  ArmorySetting,
  ArmorySettingSchema,
} from './schemas/armory-setting.schema';
import { ArmorySettingsService } from './armory-settings.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ArmorySetting.name, schema: ArmorySettingSchema },
    ]),
  ],
  providers: [ArmorySettingsService],
  exports: [ArmorySettingsService],
})
export class ArmorySettingsModule {}
