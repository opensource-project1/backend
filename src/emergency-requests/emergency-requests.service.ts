import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateEmergencyRequestDto } from './dtos/create-emergency-request.dto';

@Injectable()
export class EmergencyRequestsService {
  constructor(private prisma: PrismaService) {}

  async createEmergencyRequest(userId: number, dto: CreateEmergencyRequestDto) {
    const newRequest = await this.prisma.emergencyRequest.create({
      data: {
        userId,
        focusId: dto.focusId,
        reason: dto.reason,
        requestedAt: new Date(),
      },
    });

    return newRequest;
  }
  async getMyRequests(userId: number) {
    return this.prisma.emergencyRequest.findMany({
      where: { userId },
      orderBy: { requestedAt: 'desc' },
    });
  }
}
