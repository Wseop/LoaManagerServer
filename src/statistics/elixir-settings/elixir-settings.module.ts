import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  ElixirSetting,
  ElixirSettingSchema,
} from './schemas/elixir-setting.schema';
import { ElixirSettingsService } from './elixir-settings.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ElixirSetting.name, schema: ElixirSettingSchema },
    ]),
  ],
  providers: [ElixirSettingsService],
  exports: [ElixirSettingsService],
})
export class ElixirSettingsModule {}
