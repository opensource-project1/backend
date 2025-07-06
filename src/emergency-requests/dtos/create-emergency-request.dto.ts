import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, MinLength } from 'class-validator';

export class CreateEmergencyRequestDto {
  @ApiProperty({ example: 123, description: '포커스 세션 ID' })
  @IsInt()
  focusId: number;

  @ApiProperty({ example: '긴급 요청 사유', description: '요청 이유' })
  @IsString()
  @MinLength(1)
  reason: string;
}
