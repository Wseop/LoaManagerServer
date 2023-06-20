import { Module } from '@nestjs/common';
import { AuctionService } from './auction.service';
import { ApiRequestModule } from '../api-request/api-request.module';
import { AuctionController } from './auction.controller';

@Module({
  imports: [ApiRequestModule],
  controllers: [AuctionController],
  providers: [AuctionService],
  exports: [AuctionService],
})
export class AuctionModule {}
