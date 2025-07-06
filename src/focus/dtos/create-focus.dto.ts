import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsDateString, IsInt } from 'class-validator';

export class CreateFocusDto {
  @ApiProperty({
    example: '2025-07-06T10:00:00.000Z',
    description: '집중 시작 시간 (ISO 8601 형식)',
  })
  @IsDateString()
  startTime: string;

  @ApiProperty({
    example: '2025-07-06T11:00:00.000Z',
    description: '집중 종료 시간 (ISO 8601 형식)',
  })
  @IsDateString()
  endTime: string;

  @ApiProperty({
    example: [1, 2, 3],
    description: '차단할 사이트 ID 목록',
    type: [Number],
  })
  @IsArray()
  @IsInt({ each: true })
  blockIds: number[];
}
