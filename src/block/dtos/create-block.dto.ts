import { IsString, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBlockDto {
  @ApiProperty({
    example: 'https://www.youtube.com',
    description: '차단할 웹사이트의 URL',
  })
  @IsString()
  url: string;
}
