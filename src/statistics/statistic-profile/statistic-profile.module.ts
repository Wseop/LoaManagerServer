import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Profile,
  ProfileSchema,
} from '../../users/profiles/schemas/profile.schema';
import { StatisticProfileController } from './statistic-profile.controller';
import { StatisticProfileService } from './statistic-profile.service';
import { ProfilesModule } from 'src/users/profiles/profiles.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Profile.name, schema: ProfileSchema }]),
    ProfilesModule,
  ],
  controllers: [StatisticProfileController],
  providers: [StatisticProfileService],
  exports: [StatisticProfileService],
})
export class StatisticProfileModule {}
