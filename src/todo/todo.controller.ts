import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  Body,
  Req,
  UseGuards,
  BadRequestException,
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
  async create(@Req() req, @Body() dto: CreateTodoDto) {
    const userId = req.user.userId;
    if (!userId) {
      throw new BadRequestException('User ID not found');
    }
    return this.todoService.create(userId, dto);
  }

  @Get()
  @ApiOperation({ summary: '내 할 일 전체 조회' })
  @ApiResponse({ status: 200, description: '내 할 일 목록 반환' })
  async findAll(@Req() req) {
    const userId = req.user.userId;
    if (!userId) {
      throw new BadRequestException('User ID not found');
    }
    return this.todoService.findAll(userId);
  }

  @Get(':id')
  @ApiOperation({ summary: '특정 할 일 조회' })
  @ApiParam({ name: 'id', description: '할 일 ID' })
  @ApiResponse({ status: 200, description: '해당 ID의 할 일 반환' })
  async findOne(@Req() req, @Param('id') id: string) {
    const userId = req.user.userId;
    if (!userId) {
      throw new BadRequestException('User ID not found');
    }
    return this.todoService.findOne(userId, +id);
  }

  @Delete(':id')
  @ApiOperation({ summary: '할 일 삭제' })
  @ApiParam({ name: 'id', description: '삭제할 할 일 ID' })
  @ApiResponse({ status: 200, description: '삭제 완료' })
  async remove(@Req() req, @Param('id') id: string) {
    const userId = req.user.userId;
    if (!userId) {
      throw new BadRequestException('User ID not found');
    }
    return this.todoService.remove(userId, +id);
  }
}
