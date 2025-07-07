import {
  Controller,
  Post,
  Body,
  Get,
  Req,
  BadRequestException,
  Query,
  UseGuards,
} from '@nestjs/common';
import { FocusService } from './focus.service';
import { CreateFocusDto } from './dtos/create-focus.dto';

import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiQuery,
  ApiBody,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('Focus')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('focus')
export class FocusController {
  constructor(private readonly focusService: FocusService) {}

  @Post()
  @ApiOperation({ summary: '집중 세션 시작' })
  @ApiResponse({ status: 201, description: '집중 세션 시작 성공' })
  @ApiBody({ type: CreateFocusDto })
  async startFocus(@Req() req, @Body() dto: CreateFocusDto) {
    const userId = req.user.userId;
    if (!userId) {
      throw new BadRequestException('User ID not found');
    }

    return this.focusService.startFocus(userId, dto);
  }

  @Get()
  @ApiOperation({ summary: '날짜별 집중 세션 조회' })
  @ApiQuery({
    name: 'date',
    type: String,
    description: '조회할 날짜 (YYYY-MM-DD)',
    required: true,
  })
  @ApiResponse({ status: 200, description: '조회 성공' })
  @ApiResponse({ status: 400, description: '잘못된 요청' })
  async getFocusSessionsByDate(@Req() req, @Query('date') date: string) {
    const userId = req.user.userId;
    if (!userId) {
      throw new BadRequestException('User ID not found');
    }
    if (!date) {
      throw new BadRequestException('Date query parameter is required');
    }

    return this.focusService.getFocusSessionsByDate(userId, date);
  }
}
