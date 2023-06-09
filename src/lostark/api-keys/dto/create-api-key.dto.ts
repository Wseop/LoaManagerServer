import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateApiKeyDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  apiKey: string;
}
