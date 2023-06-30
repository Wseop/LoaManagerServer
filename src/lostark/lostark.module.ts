import { Module } from '@nestjs/common';
import { ApiKeysModule } from './api-keys/api-keys.module';
import { CharactersModule } from './characters/characters.module';
import { AuctionModule } from './auction/auction.module';
import { MarketModule } from './market/market.module';
import { NoticeModule } from './notice/notice.module';

@Module({
  imports: [
    ApiKeysModule,
    NoticeModule,
    CharactersModule,
    AuctionModule,
    MarketModule,
  ],
})
export class LostarkModule {}
