import { Controller, Delete, Get, Param, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ProfilesService } from './profiles.service';
import { AuthGuard } from '@nestjs/passport';
import { ProfileDto } from './dto/profile.dto';

@ApiTags('[Users] profiles')
@Controller('users/profiles')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @Get('/:characterName')
  @ApiOkResponse({ type: ProfileDto })
  @ApiParam({
    name: 'characterName',
    required: true,
    example: '쿠키바닐라쉐이크',
  })
  getProfile(
    @Param('characterName') characterName: string,
  ): Promise<ProfileDto> {
    return this.profilesService.findOne({ characterName });
  }

  @Delete('/:characterName')
  @UseGuards(AuthGuard('access'))
  @ApiOkResponse({ type: Number })
  @ApiUnauthorizedResponse()
  @ApiBearerAuth()
  deleteByCharacterName(
    @Param('characterName') characterName: string,
  ): Promise<number> {
    return this.profilesService.deleteByCharacterName(characterName);
  }
}
