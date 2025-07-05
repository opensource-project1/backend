import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBlockDto } from './dtos/create-block.dto';

@Injectable()
export class BlockService {
    constructor(private prisma: PrismaService) {}

    async create(dto: CreateBlockDto) {
    return this.prisma.blockedSite.create({ data: {
        userId: dto.userId,
        url: dto.url,
        startTime: new Date(dto.startTime),
        endTime: new Date(dto.endTime),
    },
    });
    }

    async findAll() {
    return this.prisma.blockedSite.findMany();
    }

    async findOne(id: number) {
    return this.prisma.blockedSite.findUnique({ where: { id } });
    }

    async remove(id: number) {
    return this.prisma.blockedSite.delete({ where: { id } });
    }
}
