import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StatsSkill, StatsSkillSchema } from './schemas/stats-skill.schema';
import { StatsSkillService } from './stats-skill.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: StatsSkill.name, schema: StatsSkillSchema },
    ]),
  ],
  providers: [StatsSkillService],
  exports: [StatsSkillService],
})
export class StatsSkillModule {}
