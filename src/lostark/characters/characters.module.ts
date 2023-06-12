import { Module } from '@nestjs/common';
import { CharactersService } from './characters.service';
import { SkillSettingsModule } from 'src/statistics/skill-settings/skill-settings.module';
import { EngraveModule } from 'src/resources/engrave/engrave.module';
import { ProfilesModule } from 'src/statistics/profiles/profiles.module';
import { AbilitySettingsModule } from 'src/statistics/ability-settings/ability-settings.module';
import { ElixirSettingsModule } from 'src/statistics/elixir-settings/elixir-settings.module';
import { EngraveSettingsModule } from 'src/statistics/engrave-settings/engrave-settings.module';
import { SetSettingsModule } from 'src/statistics/set-settings/set-settings.module';

@Module({
  imports: [
    ProfilesModule,
    AbilitySettingsModule,
    ElixirSettingsModule,
    EngraveSettingsModule,
    SetSettingsModule,
    SkillSettingsModule,
    EngraveModule,
  ],
  providers: [CharactersService],
  exports: [CharactersService],
})
export class CharactersModule {}
