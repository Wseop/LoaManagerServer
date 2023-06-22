import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Profile, ProfileSchema } from './schemas/profile.schema';
import { StatisticProfileController } from './statistic-profile.controller';
import { StatisticProfileService } from './statistic-profile.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Profile.name, schema: ProfileSchema }]),
  ],
  controllers: [StatisticProfileController],
  providers: [StatisticProfileService],
  exports: [StatisticProfileService],
})
export class StatisticProfileModule {}
