import { Module } from '@nestjs/common';
import { MarketService } from './market.service';
import { ApiRequestModule } from '../api-request/api-request.module';
import { MarketController } from './market.controller';

@Module({
  imports: [ApiRequestModule],
  controllers: [MarketController],
  providers: [MarketService],
  exports: [MarketService],
})
export class MarketModule {}
