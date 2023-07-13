import { Module } from '@nestjs/common';
import { ProfilesModule } from './profiles/profiles.module';
import { SkillSettingsModule } from './skill-settings/skill-settings.module';

@Module({
  imports: [ProfilesModule, SkillSettingsModule],
})
export class UsersModule {}
