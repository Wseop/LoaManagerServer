import { IsNotEmpty, IsString, ValidateNested } from 'class-validator';

export class RewardDto {
  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  @ValidateNested({ each: true })
  rewards: [
    {
      level: string;
      cost?: number;
      items: [
        {
          item: string;
          count: number;
        },
      ];
    },
  ];
}
