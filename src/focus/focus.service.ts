import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateFocusDto } from './dtos/create-focus.dto';

@Injectable()
export class FocusService {
  constructor(private prisma: PrismaService) {}

  async startFocus(userId: number, dto: CreateFocusDto) {
    const newFocus = await this.prisma.focus.create({
      data: {
        userId,
        startTime: new Date(dto.startTime),
        endTime: new Date(dto.endTime),
        status: 'ONGOING',
      },
    });

    return newFocus;
  }

  async getFocusSessionsByDate(userId: number, date: string) {
    const dayStart = new Date(date + 'T00:00:00.000Z');
    const dayEnd = new Date(date + 'T23:59:59.999Z');

    return this.prisma.focus.findMany({
      where: {
        userId,
        startTime: {
          gte: dayStart,
          lte: dayEnd,
        },
      },
      orderBy: {
        startTime: 'asc',
      },
    });
  }
}
