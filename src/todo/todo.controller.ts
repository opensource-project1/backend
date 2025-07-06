import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  Body,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiParam,
} from '@nestjs/swagger';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dtos/create-todo.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('Todo')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  @ApiOperation({ summary: '할 일 생성' })
  @ApiResponse({ status: 201, description: '할 일 생성 성공' })
  create(@Body() dto: CreateTodoDto) {
    return this.todoService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: '전체 할 일 조회' })
  @ApiResponse({ status: 200, description: '모든 할 일 반환' })
  findAll() {
    return this.todoService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: '특정 할 일 조회' })
  @ApiParam({ name: 'id', description: '할 일 ID' })
  @ApiResponse({ status: 200, description: '해당 ID의 할 일 반환' })
  findOne(@Param('id') id: string) {
    return this.todoService.findOne(+id);
  }

  @Delete(':id')
  @ApiOperation({ summary: '할 일 삭제' })
  @ApiParam({ name: 'id', description: '삭제할 할 일 ID' })
  @ApiResponse({ status: 200, description: '삭제 완료' })
  remove(@Param('id') id: string) {
    return this.todoService.remove(+id);
  }
}
