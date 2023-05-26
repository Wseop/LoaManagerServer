import { Module } from '@nestjs/common';
import { ResourcesController } from './resources.controller';
import { ResourcesService } from './resources.service';
import { ClassModule } from './class/class.module';
import { EngraveModule } from './engrave/engrave.module';
import { RewardModule } from './reward/reward.module';
import { SkillModule } from './skill/skill.module';

@Module({
  imports: [ClassModule, EngraveModule, RewardModule, SkillModule],
  controllers: [ResourcesController],
  providers: [ResourcesService],
})
export class ResourcesModule {}
