import { Module } from '@nestjs/common';
import { ResourcesController } from './resources.controller';
import { ResourcesService } from './resources.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Class, ClassSchema } from './schemas/class.schema';
import { Engrave, EngraveSchema } from './schemas/engrave.schema';
import { Reward, RewardSchema } from './schemas/reward.schema';
import { Skill, SkillSchema } from './schemas/skill.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Class.name, schema: ClassSchema },
      { name: Engrave.name, schema: EngraveSchema },
      { name: Reward.name, schema: RewardSchema },
      { name: Skill.name, schema: SkillSchema },
    ]),
  ],
  controllers: [ResourcesController],
  providers: [ResourcesService],
})
export class ResourcesModule {}
