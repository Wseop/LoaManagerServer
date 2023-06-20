import { Module } from '@nestjs/common';
import { ClassModule } from './class/class.module';
import { EngraveModule } from './engrave/engrave.module';
import { RewardModule } from './reward/reward.module';
import { SkillModule } from './skill/skill.module';

@Module({
  imports: [ClassModule, EngraveModule, RewardModule, SkillModule],
})
export class ResourcesModule {}
