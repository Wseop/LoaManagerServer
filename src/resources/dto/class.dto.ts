import { IsNotEmpty, IsString } from 'class-validator';

export class ClassDto {
  @IsNotEmpty()
  @IsString()
  parent: string;

  @IsNotEmpty()
  @IsString({ each: true })
  child: string[];
}
