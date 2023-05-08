import { IsNotEmpty, IsString, ValidateNested } from 'class-validator';

export class StatsSkillDto {
  @IsNotEmpty()
  @IsString()
  characterName: string;

  @IsNotEmpty()
  @IsString()
  className: string;

  @IsNotEmpty()
  @IsString({ each: true })
  classEngraves: string[];

  @IsNotEmpty()
  @ValidateNested({ each: true })
  skills: [
    {
      skillName: string;
      tripodNames: string[];
      runeName: string;
    },
  ];
}
