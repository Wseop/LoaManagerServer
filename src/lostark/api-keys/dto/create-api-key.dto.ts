import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateApiKeyDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  apiKey: string;
}
