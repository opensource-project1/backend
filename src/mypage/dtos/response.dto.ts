import { Type } from 'class-transformer';
import { IsNumber, IsString, IsEnum, IsDate, IsArray } from 'class-validator';

export class BlockedUrlDto {
  @IsNumber()
  id: number;

  @IsString()
  url: string;
}

export enum FocusStatus {
  ONGOING = 'ONGOING',
  COMPLETED = 'COMPLETED',
  CANCELED = 'CANCELED',
}

export class FocusSessionDto {
  @IsNumber()
  id: number;

  @IsDate()
  @Type(() => Date)
  startTime: Date;

  @IsDate()
  @Type(() => Date)
  endTime: Date;

  @IsEnum(FocusStatus)
  status: FocusStatus;
}

export class MyPageResponseDto {
  @IsNumber()
  userId: number;

  @IsNumber()
  totalFocusTimeMinutes: number;

  @IsNumber()
  completedPlansToday: number;

  @IsNumber()
  totalPlansToday: number;

  @IsArray()
  @Type(() => BlockedUrlDto)
  blockedUrls: BlockedUrlDto[];

  @IsArray()
  @Type(() => FocusSessionDto)
  focusSessions: FocusSessionDto[];
}
