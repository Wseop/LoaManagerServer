import { Module } from '@nestjs/common';
import { ApiKeysModule } from '../api-keys/api-keys.module';
import { ApiRequestService } from './api-request.service';

@Module({
  imports: [ApiKeysModule],
  providers: [ApiRequestService],
  exports: [ApiRequestService],
})
export class ApiRequestModule {}
