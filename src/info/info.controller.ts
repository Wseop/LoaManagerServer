import { Controller, Get, Param } from '@nestjs/common';
import { InfoService } from './info.service';
import { ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { InfoDto } from './dto/info.dto';

@ApiTags('[Info]')
@Controller('info')
export class InfoController {
  constructor(private readonly infoService: InfoService) {}

  @Get()
  @ApiOkResponse({ type: [InfoDto] })
  findAll(): Promise<InfoDto[]> {
    return this.infoService.find();
  }

  @Get(':key')
  @ApiParam({ name: 'key', required: true, example: 'version' })
  @ApiOkResponse({ type: InfoDto })
  find(@Param('key') key: string): Promise<InfoDto> {
    return this.infoService.findByKey(key);
  }
}
