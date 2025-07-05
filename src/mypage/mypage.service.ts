import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  MyPageResponseDto,
  BlockedUrlDto,
  FocusSessionDto,
  FocusStatus,
} from './dtos/response.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class MypageService {
  constructor(private readonly prisma: PrismaService) {}

  private mapStatusToEnum(status: string): FocusStatus {
    switch (status) {
      case 'ONGOING':
        return FocusStatus.ONGOING;
      case 'COMPLETED':
        return FocusStatus.COMPLETED;
      case 'CANCELED':
        return FocusStatus.CANCELED;
      default:
        throw new Error(`Unknown status: ${status}`);
    }
  }

  async getMyPageData(userId: number): Promise<MyPageResponseDto> {
    // 1. 차단 URL 조회
    const blocksRaw = await this.prisma.block.findMany({
      where: { userId },
      select: { id: true, url: true },
    });
    const blockedUrls: BlockedUrlDto[] = plainToInstance(
      BlockedUrlDto,
      blocksRaw,
    );

    // 2. 집중 세션 조회
    const focusSessionsRaw = await this.prisma.focus.findMany({
      where: { userId },
      select: {
        id: true,
        startTime: true,
        endTime: true,
        status: true,
      },
    });
    const focusSessions: FocusSessionDto[] = focusSessionsRaw.map(
      (session) => ({
        id: session.id,
        startTime: session.startTime,
        endTime: session.endTime,
        status: this.mapStatusToEnum(session.status),
      }),
    );

    // 3. 오늘 날짜 (yyyy-MM-dd)
    const todayDateStr = new Date().toISOString().slice(0, 10);

    // 4. 오늘 집중 시간 (FocusLog에서 조회)
    const focusLog = await this.prisma.focusLog.findUnique({
      where: {
        userId_date: {
          userId,
          date: new Date(todayDateStr),
        },
      },
    });
    const totalFocusTimeMinutes = focusLog ? focusLog.totalFocusTime : 0;

    // 5. 오늘 플래너 계획 조회 (Todo)
    const startOfDay = new Date(todayDateStr + 'T00:00:00.000Z');
    const endOfDay = new Date(todayDateStr + 'T23:59:59.999Z');

    const totalPlansToday = await this.prisma.todo.count({
      where: {
        userId,
        createdAt: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
    });

    const completedPlansToday = await this.prisma.todo.count({
      where: {
        userId,
        createdAt: {
          gte: startOfDay,
          lte: endOfDay,
        },
        isDone: true,
      },
    });

    return {
      userId,
      totalFocusTimeMinutes,
      completedPlansToday,
      totalPlansToday,
      blockedUrls,
      focusSessions,
    };
  }
}
