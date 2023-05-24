import { Module } from '@nestjs/common';
import { AuctionsService } from './auctions.service';

@Module({
  providers: [AuctionsService],
  exports: [AuctionsService],
})
export class AuctionsModule {}
