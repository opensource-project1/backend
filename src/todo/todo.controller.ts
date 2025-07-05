import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dtos/create-todo.dto';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  create(@Body() dto: CreateTodoDto) {
    return this.todoService.create(dto);
  }

  @Get()
  findAll() {
    return this.todoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.todoService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.todoService.remove(+id);
  }
}