import { Controller, Get, Param } from '@nestjs/common';
import { InfoService } from './info.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('info')
@Controller('info')
export class InfoController {
  constructor(private readonly infoService: InfoService) {}

  @Get()
  @ApiOkResponse()
  findAll() {
    return this.infoService.findAll();
  }

  @Get(':key')
  @ApiOkResponse()
  find(@Param('key') key: string) {
    return this.infoService.find(key);
  }
}
