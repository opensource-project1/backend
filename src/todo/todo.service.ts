import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTodoDto } from './dtos/create-todo.dto';

@Injectable()
export class TodoService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: number, dto: CreateTodoDto) {
    return this.prisma.todo.create({
      data: {
        content: dto.content,
        userId: userId,
        isDone: dto.isDone,
      },
    });
  }

  async findAll(userId: number) {
    return this.prisma.todo.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(userId: number, id: number) {
    return this.prisma.todo.findFirst({
      where: {
        id,
        userId,
      },
    });
  }

  async remove(userId: number, id: number) {
    return this.prisma.todo.deleteMany({
      where: {
        id,
        userId,
      },
    });
  }
}
