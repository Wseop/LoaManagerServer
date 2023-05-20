import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SkillSettingsService } from './skill-settings.service';
import {
  SkillSetting,
  SkillSettingSchema,
} from './schemas/skill-setting.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SkillSetting.name, schema: SkillSettingSchema },
    ]),
  ],
  providers: [SkillSettingsService],
  exports: [SkillSettingsService],
})
export class SkillSettingsModule {}
