import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  SkillSetting,
  SkillSettingSchema,
} from '../../users/skill-settings/schemas/skill-setting.schema';
import { StatisticSkillController } from './statistic-skill.controller';
import { StatisticSkillService } from './statistic-skill.service';
import { SkillSettingsModule } from 'src/users/skill-settings/skill-settings.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SkillSetting.name, schema: SkillSettingSchema },
    ]),
    SkillSettingsModule,
  ],
  controllers: [StatisticSkillController],
  providers: [StatisticSkillService],
  exports: [StatisticSkillService],
})
export class StatisticSkillModule {}
