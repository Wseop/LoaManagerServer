import { Module } from '@nestjs/common';
import { ApiRequestModule } from '../api-request/api-request.module';
import { NoticeController } from './notice.controller';
import { NoticeService } from './notice.service';

@Module({
  imports: [ApiRequestModule],
  controllers: [NoticeController],
  providers: [NoticeService],
  exports: [NoticeService],
})
export class NoticeModule {}
