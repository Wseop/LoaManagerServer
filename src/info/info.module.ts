import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { InfoController } from './info.controller';
import { InfoService } from './info.service';
import { Info, InfoSchema } from './schemas/info.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Info.name, schema: InfoSchema }]),
  ],
  controllers: [InfoController],
  providers: [InfoService],
})
export class InfoModule {}
