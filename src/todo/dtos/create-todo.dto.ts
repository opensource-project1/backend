import { IsString, IsInt, IsBoolean } from 'class-validator';

export class CreateTodoDto {
  @IsString()
  content: string;

  @IsInt()
  userId: number;

  @IsBoolean()
  isDone: boolean;
}
