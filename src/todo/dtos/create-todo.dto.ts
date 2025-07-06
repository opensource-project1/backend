import { IsString, IsInt, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTodoDto {
  @ApiProperty({
    example: '운동하기',
    description: '할 일의 내용',
  })
  @IsString()
  content: string;

  @ApiProperty({
    example: 1,
    description: '할 일을 등록한 사용자 ID',
  })
  @IsInt()
  userId: number;

  @ApiProperty({
    example: false,
    description: '할 일 완료 여부 (true: 완료, false: 미완료)',
  })
  @IsBoolean()
  isDone: boolean;
}
