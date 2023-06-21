import { Module } from '@nestjs/common';
import { CharactersService } from './characters.service';
import { SkillSettingsModule } from 'src/statistics/skill-settings/skill-settings.module';
import { EngraveModule } from 'src/resources/engrave/engrave.module';
import { ProfilesModule } from 'src/statistics/profiles/profiles.module';
import { EngraveSettingsModule } from 'src/statistics/engrave-settings/engrave-settings.module';
import { SetSettingsModule } from 'src/statistics/set-settings/set-settings.module';
import { CharactersController } from './characters.controller';
import { ApiRequestModule } from '../api-request/api-request.module';
import { StatisticAbilityModule } from 'src/statistics/statistic-ability/statistic-ability.module';
import { StatisticElixirModule } from 'src/statistics/statistic-elixir/statistic-elixir.module';

@Module({
  imports: [
    ApiRequestModule,
    ProfilesModule,
    StatisticAbilityModule,
    StatisticElixirModule,
    EngraveSettingsModule,
    SetSettingsModule,
    SkillSettingsModule,
    EngraveModule,
  ],
  controllers: [CharactersController],
  providers: [CharactersService],
  exports: [CharactersService],
})
export class CharactersModule {}
