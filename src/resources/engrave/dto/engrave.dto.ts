import { ApiProperty } from '@nestjs/swagger';

export class EngraveDto {
  @ApiProperty()
  code: number;

  @ApiProperty()
  engraveName: string;

  @ApiProperty()
  className: string;

  @ApiProperty()
  isPenalty: boolean;
}
