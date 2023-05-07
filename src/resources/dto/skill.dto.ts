import { IsNotEmpty, IsString, ValidateNested } from 'class-validator';

export class SkillDto {
  @IsNotEmpty()
  @IsString()
  className: string;

  @IsNotEmpty()
  @ValidateNested({ each: true })
  skills: [
    {
      skillName: string;
      skillCode: number;
      iconPath: string;
      isCounter: boolean;
      tripods: [
        {
          tripodName: string;
          tripodCode: number;
          iconIndex: number;
        },
      ];
    },
  ];
}
