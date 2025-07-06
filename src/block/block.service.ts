import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBlockDto } from './dtos/create-block.dto';

@Injectable()
export class BlockService {
  constructor(private prisma: PrismaService) {}

  async create(userId: number, dto: CreateBlockDto) {
    return this.prisma.block.create({
      data: {
        userId,
        url: dto.url,
      },
    });
  }

  async findAll(userId: number) {
    return this.prisma.block.findMany({
      where: { userId },
    });
  }

  async findOne(userId: number, id: number) {
    return this.prisma.block.findFirst({
      where: {
        id,
        userId,
      },
    });
  }

  async remove(userId: number, id: number) {
    return this.prisma.block.deleteMany({
      where: {
        id,
        userId,
      },
    });
  }
}
