import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminModule } from './admin/admin.module';
import { ApiKeyModule } from './apikey/apikey.module';
import { CharacterModule } from './character/character.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.DATABASE_URI),
    AdminModule,
    ApiKeyModule,
    CharacterModule,
  ],
})
export class AppModule {}
