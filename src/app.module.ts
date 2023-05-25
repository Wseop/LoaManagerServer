import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminModule } from './admin/admin.module';
import { UserModule } from './user/user.module';
import { ResourcesModule } from './resources/resources.module';
import { StatisticsModule } from './statistics/statistics.module';
import { LostarkModule } from './lostark/lostark.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.DATABASE_URI),
    AdminModule,
    UserModule,
    ResourcesModule,
    StatisticsModule,
    LostarkModule,
  ],
})
export class AppModule {}
