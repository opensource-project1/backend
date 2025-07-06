import {
  Controller,
  Post,
  Query,
  Body,
  Get,
  BadRequestException,
  UseGuards,
} from '@nestjs/common';
import { FocusService } from './focus.service';
import { CreateFocusDto } from './dtos/create-focus.dto';

import {
  ApiTags,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('Focus')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
@Controller('api/focus')
export class FocusController {
  constructor(private readonly focusService: FocusService) {}

  @Post()
  @ApiOperation({ summary: '집중 세션 시작' })
  @ApiQuery({
    name: 'userId',
    type: Number,
    description: '사용자 ID',
    required: true,
  })
  @ApiResponse({ status: 201, description: '집중 세션 시작 성공' })
  @ApiResponse({ status: 400, description: '유효하지 않은 userId' })
  async startFocus(
    @Query('userId') userId: string,
    @Body() dto: CreateFocusDto,
  ) {
    const parsedUserId = Number(userId);
    if (isNaN(parsedUserId)) {
      throw new BadRequestException('Invalid userId');
    }

    return this.focusService.startFocus(parsedUserId, dto);
  }

  @Get()
  @ApiOperation({ summary: '날짜별 집중 세션 조회' })
  @ApiQuery({
    name: 'userId',
    type: Number,
    description: '사용자 ID',
    required: true,
  })
  @ApiQuery({
    name: 'date',
    type: String,
    description: '조회할 날짜 (YYYY-MM-DD)',
    required: true,
  })
  @ApiResponse({ status: 200, description: '조회 성공' })
  @ApiResponse({ status: 400, description: '잘못된 요청' })
  async getFocusSessionsByDate(
    @Query('userId') userId: string,
    @Query('date') date: string,
  ) {
    const parsedUserId = Number(userId);
    if (isNaN(parsedUserId)) {
      throw new BadRequestException('Invalid userId');
    }
    if (!date) {
      throw new BadRequestException('Date query parameter is required');
    }

    return this.focusService.getFocusSessionsByDate(parsedUserId, date);
  }
}
