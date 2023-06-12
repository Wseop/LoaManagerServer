import { Module } from '@nestjs/common';
import { StatisticsController } from './statistics.controller';
import { StatisticsService } from './statistics.service';
import { ChaosRewardsModule } from './chaos-rewards/chaos-rewards.module';
import { GuardianRewardsModule } from './guardian-rewards/guardian-rewards.module';
import { SkillSettingsModule } from './skill-settings/skill-settings.module';
import { EngraveModule } from 'src/resources/engrave/engrave.module';
import { AbilitySettingsModule } from './ability-settings/ability-settings.module';
import { ElixirSettingsModule } from './elixir-settings/elixir-settings.module';
import { EngraveSettingsModule } from './engrave-settings/engrave-settings.module';
import { ProfilesModule } from './profiles/profiles.module';
import { SetSettingsModule } from './set-settings/set-settings.module';

@Module({
  imports: [
    ChaosRewardsModule,
    GuardianRewardsModule,
    SkillSettingsModule,
    AbilitySettingsModule,
    ElixirSettingsModule,
    EngraveSettingsModule,
    ProfilesModule,
    SetSettingsModule,
    EngraveModule,
  ],
  controllers: [StatisticsController],
  providers: [StatisticsService],
})
export class StatisticsModule {}
