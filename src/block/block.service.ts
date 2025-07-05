import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBlockDto } from './dtos/create-block.dto';

@Injectable()
export class BlockService {
    constructor(private prisma: PrismaService) {}

    async create(dto: CreateBlockDto) {
    return this.prisma.block.create({ data: {
        userId: dto.userId,
        url: dto.url,
    },
    });
    }

    async findAll() {
    return this.prisma.block.findMany();
    }

    async findOne(id: number) {
    return this.prisma.block.findUnique({ where: { id } });
    }

    async remove(id: number) {
    return this.prisma.block.delete({ where: { id } });
    }
}
