import { IsInt, IsString, MinLength } from 'class-validator';

export class CreateEmergencyRequestDto {
  @IsInt()
  focusId: number;

  @IsString()
  @MinLength(1)
  reason: string;
}
