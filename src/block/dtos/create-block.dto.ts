import { IsString, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBlockDto {
  @ApiProperty({
    example: 'https://www.youtube.com',
    description: '차단할 웹사이트의 URL',
  })
  @IsString()
  url: string;

  @ApiProperty({
    example: 1,
    description: '차단을 등록한 사용자 ID',
  })
  @IsInt()
  userId: number;
}
