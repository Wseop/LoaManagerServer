import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  EngraveSetting,
  EngraveSettingSchema,
} from './schemas/engrave-setting.schema';
import { EngraveSettingsService } from './engrave-settings.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: EngraveSetting.name, schema: EngraveSettingSchema },
    ]),
  ],
  providers: [EngraveSettingsService],
  exports: [EngraveSettingsService],
})
export class EngraveSettingsModule {}
