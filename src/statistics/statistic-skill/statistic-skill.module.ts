import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  SkillSetting,
  SkillSettingSchema,
} from './schemas/skill-setting.schema';
import { StatisticSkillController } from './statistic-skill.controller';
import { StatisticSkillService } from './statistic-skill.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SkillSetting.name, schema: SkillSettingSchema },
    ]),
  ],
  controllers: [StatisticSkillController],
  providers: [StatisticSkillService],
  exports: [StatisticSkillService],
})
export class StatisticSkillModule {}
