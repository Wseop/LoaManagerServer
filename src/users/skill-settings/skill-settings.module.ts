import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  SkillSetting,
  SkillSettingSchema,
} from './schemas/skill-setting.schema';
import { SkillSettingsController } from './skill-settings.controller';
import { SkillSettingsService } from './skill-settings.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SkillSetting.name, schema: SkillSettingSchema },
    ]),
  ],
  controllers: [SkillSettingsController],
  providers: [SkillSettingsService],
  exports: [SkillSettingsService],
})
export class SkillSettingsModule {}
