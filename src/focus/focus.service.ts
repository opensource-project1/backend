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
}
