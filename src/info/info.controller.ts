import { Controller, Get, Param } from '@nestjs/common';
import { InfoService } from './info.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { InfoDto } from './dto/info.dto';

@ApiTags('Info')
@Controller('info')
export class InfoController {
  constructor(private readonly infoService: InfoService) {}

  @Get()
  @ApiOkResponse({ type: [InfoDto] })
  findAll() {
    return this.infoService.findAll();
  }

  @Get(':key')
  @ApiOkResponse({ type: InfoDto })
  find(@Param('key') key: string) {
    return this.infoService.find(key);
  }
}
