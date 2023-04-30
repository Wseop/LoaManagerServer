import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  CharacterSetting,
  CharacterSettingSchema,
} from './schemas/characterSetting.schema';
import { CharacterController } from './character.controller';
import { CharacterService } from './character.service';
import {
  CharacterSkill,
  CharacterSkillSchema,
} from './schemas/characterSkill.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CharacterSetting.name, schema: CharacterSettingSchema },
    ]),
    MongooseModule.forFeature([
      { name: CharacterSkill.name, schema: CharacterSkillSchema },
    ]),
  ],
  controllers: [CharacterController],
  providers: [CharacterService],
})
export class CharacterModule {}
