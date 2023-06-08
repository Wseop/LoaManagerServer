import { Module } from '@nestjs/common';
import { CharactersService } from './characters.service';
import { SkillSettingsModule } from 'src/statistics/skill-settings/skill-settings.module';
import { EngraveModule } from 'src/resources/engrave/engrave.module';

@Module({
  imports: [SkillSettingsModule, EngraveModule],
  providers: [CharactersService],
  exports: [CharactersService],
})
export class CharactersModule {}
