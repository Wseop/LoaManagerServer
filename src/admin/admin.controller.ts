import { Controller, Get, Param } from '@nestjs/common';
import { AdminService } from './admin.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('admin')
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get()
  @ApiOkResponse()
  findAll() {
    return this.adminService.findAll();
  }

  @Get(':key')
  @ApiOkResponse()
  find(@Param('key') key: string) {
    return this.adminService.find(key);
  }
}
