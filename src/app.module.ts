import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminModule } from './admin/admin.module';
import { ApiKeyModule } from './apikey/apikey.module';
import { UserModule } from './user/user.module';
import { ResourcesModule } from './resources/resources.module';
import { StatisticsModule } from './statistics/statistics.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.DATABASE_URI),
    AdminModule,
    ApiKeyModule,
    UserModule,
    ResourcesModule,
    StatisticsModule,
  ],
})
export class AppModule {}
