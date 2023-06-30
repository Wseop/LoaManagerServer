import { Injectable } from '@nestjs/common';
import { ApiRequestService } from '../api-request/api-request.service';
import { NoticeQueryDto } from './dto/notice-query.dto';
import { NoticeDto } from './dto/notice.dto';

@Injectable()
export class NoticeService {
  constructor(private readonly apiRequestService: ApiRequestService) {}

  async getNotices(noticeQueryDto: NoticeQueryDto): Promise<NoticeDto[]> {
    let url = 'https://developer-lostark.game.onstove.com/news/notices';
    let query = '';

    if (noticeQueryDto.searchText)
      query = `?searchText=${noticeQueryDto.searchText}`;
    if (noticeQueryDto.type) {
      if (query === '') query = `?type=${noticeQueryDto.type}`;
      else query += `&type=${noticeQueryDto.type}`;
    }

    const notices: NoticeDto[] = [];
    (await this.apiRequestService.get(url + query)).data.forEach((element) => {
      notices.push({
        title: element.Title,
        date: element.Date,
        link: element.Link,
      });
    });

    return notices;
  }
}
