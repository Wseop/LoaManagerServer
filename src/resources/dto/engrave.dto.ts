import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class EngraveDto {
  @IsNotEmpty()
  @IsNumber()
  code: number;

  @IsNotEmpty()
  @IsString()
  engraveName: string;

  @IsString()
  className: string;

  @IsNotEmpty()
  @IsBoolean()
  isPenalty: boolean;
}
