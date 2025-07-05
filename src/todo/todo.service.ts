import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTodoDto } from './dtos/create-todo.dto'

@Injectable()
export class TodoService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateTodoDto) {
    return this.prisma.todo.create({
      data: {
        content: dto.content,
        userId: dto.userId,
        isDone: dto.isDone,
      },
    });
  }

  async findAll() {
    return this.prisma.todo.findMany();
  }

  async findOne(id: number) {
    return this.prisma.todo.findUnique({
      where: { id },
    });
  }

  async remove(id: number) {
    return this.prisma.todo.delete({
      where: { id },
    });
  }
}
