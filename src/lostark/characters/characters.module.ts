import { Module } from '@nestjs/common';
import { CharactersService } from './characters.service';
import { EngraveModule } from 'src/resources/engrave/engrave.module';
import { CharactersController } from './characters.controller';
import { ApiRequestModule } from '../api-request/api-request.module';
import { StatisticAbilityModule } from 'src/statistics/statistic-ability/statistic-ability.module';
import { StatisticElixirModule } from 'src/statistics/statistic-elixir/statistic-elixir.module';
import { StatisticSetModule } from 'src/statistics/statistic-set/statistic-set.module';
import { StatisticEngraveModule } from 'src/statistics/statistic-engrave/statistic-engrave.module';
import { StatisticSkillModule } from 'src/statistics/statistic-skill/statistic-skill.module';
import { StatisticProfileModule } from 'src/statistics/statistic-profile/statistic-profile.module';

@Module({
  imports: [
    ApiRequestModule,
    StatisticProfileModule,
    StatisticAbilityModule,
    StatisticElixirModule,
    StatisticEngraveModule,
    StatisticSetModule,
    StatisticSkillModule,
    EngraveModule,
  ],
  controllers: [CharactersController],
  providers: [CharactersService],
  exports: [CharactersService],
})
export class CharactersModule {}
