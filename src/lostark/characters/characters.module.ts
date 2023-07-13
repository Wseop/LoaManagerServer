import { Module } from '@nestjs/common';
import { CharactersService } from './characters.service';
import { EngraveModule } from 'src/resources/engrave/engrave.module';
import { CharactersController } from './characters.controller';
import { ApiRequestModule } from '../api-request/api-request.module';
import { StatisticSkillModule } from 'src/statistics/statistic-skill/statistic-skill.module';
import { StatisticProfileModule } from 'src/statistics/statistic-profile/statistic-profile.module';
import { ProfilesModule } from 'src/users/profiles/profiles.module';
import { SkillSettingsModule } from 'src/users/skill-settings/skill-settings.module';

@Module({
  imports: [
    ApiRequestModule,
    StatisticProfileModule,
    StatisticSkillModule,
    EngraveModule,
    ProfilesModule,
    SkillSettingsModule,
  ],
  controllers: [CharactersController],
  providers: [CharactersService],
  exports: [CharactersService],
})
export class CharactersModule {}
