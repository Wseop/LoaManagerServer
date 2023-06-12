import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SetSetting, SetSettingSchema } from './schemas/set-setting.schema';
import { SetSettingsService } from './set-settings.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SetSetting.name, schema: SetSettingSchema },
    ]),
  ],
  providers: [SetSettingsService],
  exports: [SetSettingsService],
})
export class SetSettingsModule {}
