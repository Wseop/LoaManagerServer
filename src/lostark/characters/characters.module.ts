import { Module } from '@nestjs/common';
import { CharactersService } from './characters.service';
import { ArmorySettingsModule } from 'src/statistics/armory-settings/armory-settings.module';
import { SkillSettingsModule } from 'src/statistics/skill-settings/skill-settings.module';
import { EngraveModule } from 'src/resources/engrave/engrave.module';

@Module({
  imports: [ArmorySettingsModule, SkillSettingsModule, EngraveModule],
  providers: [CharactersService],
  exports: [CharactersService],
})
export class CharactersModule {}
