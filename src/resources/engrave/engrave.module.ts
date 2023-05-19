import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Engrave, EngraveSchema } from './schemas/engrave.schema';
import { EngraveService } from './engrave.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Engrave.name, schema: EngraveSchema }]),
  ],
  providers: [EngraveService],
  exports: [EngraveService],
})
export class EngraveModule {}
