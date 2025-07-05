import { IsArray, IsDateString, IsInt } from 'class-validator';

export class CreateFocusDto {
  @IsDateString()
  startTime: string;

  @IsDateString()
  endTime: string;

  @IsArray()
  @IsInt({ each: true })
  blockIds: number[];
}
