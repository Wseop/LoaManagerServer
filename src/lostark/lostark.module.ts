import { Module } from '@nestjs/common';
import { ApiKeysModule } from './api-keys/api-keys.module';
import { LostarkController } from './lostark.controller';
import { LostarkService } from './lostark.service';
import { CharactersModule } from './characters/characters.module';
import { AuctionsModule } from './auctions/auctions.module';
import { MarketsModule } from './markets/markets.module';

@Module({
  imports: [ApiKeysModule, CharactersModule, AuctionsModule, MarketsModule],
  controllers: [LostarkController],
  providers: [LostarkService],
})
export class LostarkModule {}
