import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CreateRewardChaosDto {
  @IsNotEmpty()
  @IsString()
  level: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  count: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  silling: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  shard: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  destruction: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  protection: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  leapStone: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  gem: number;
}
