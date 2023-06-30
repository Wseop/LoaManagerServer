import {
  Controller,
  Get,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiOkResponse,
  ApiServiceUnavailableResponse,
  ApiTags,
  ApiTooManyRequestsResponse,
} from '@nestjs/swagger';
import { NoticeService } from './notice.service';
import { NoticeDto } from './dto/notice.dto';
import { NoticeQueryDto } from './dto/notice-query.dto';

@ApiTags('[Lostark] notice')
@Controller('lostark/notice')
export class NoticeController {
  constructor(private readonly noticeService: NoticeService) {}

  @Get()
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiOkResponse({ type: [NoticeDto] })
  @ApiTooManyRequestsResponse({ description: 'API request limit' })
  @ApiServiceUnavailableResponse({
    description: 'Lostark api server is under maintenance',
  })
  getNotices(@Query() noticeQueryDto: NoticeQueryDto): Promise<NoticeDto[]> {
    return this.noticeService.getNotices(noticeQueryDto);
  }
}
