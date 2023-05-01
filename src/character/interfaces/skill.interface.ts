import { IsNotEmpty, IsString } from 'class-validator';

export class ISkill {
  @IsNotEmpty()
  @IsString()
  skillName: string;

  @IsString({ each: true })
  tripodNames: string[];

  @IsString()
  runeName: string;
}
