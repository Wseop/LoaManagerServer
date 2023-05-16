import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ClassDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  parent: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString({ each: true })
  child: string[];
}
