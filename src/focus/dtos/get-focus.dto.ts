import { IsDateString } from 'class-validator';

export class GetFocusDto {
  @IsDateString()
  date: string;
}
