import { Module } from '@nestjs/common';
import { ApiKeysModule } from './api-keys/api-keys.module';
import { LostarkController } from './lostark.controller';
import { LostarkService } from './lostark.service';

@Module({
  imports: [ApiKeysModule],
  controllers: [LostarkController],
  providers: [LostarkService],
})
export class LostarkModule {}
