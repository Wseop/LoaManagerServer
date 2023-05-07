import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminModule } from './admin/admin.module';
import { ApiKeyModule } from './apikey/apikey.module';
import { CharacterModule } from './character/character.module';
import { RewardModule } from './reward/reward.module';
import { UserModule } from './user/user.module';
import { ResourcesModule } from './resources/resources.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.DATABASE_URI),
    AdminModule,
    ApiKeyModule,
    CharacterModule,
    RewardModule,
    UserModule,
    ResourcesModule,
  ],
})
export class AppModule {}
