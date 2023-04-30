import { IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ISkill } from '../interfaces/skill.interface';

export class CreateCharacterSkillDto {
  @IsNotEmpty()
  @IsString()
  characterName: string;

  @IsNotEmpty()
  @IsString()
  className: string;

  @IsNotEmpty()
  @IsString({ each: true })
  classEngrave: string[];

  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => ISkill)
  skill: ISkill[];
}
