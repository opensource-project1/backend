import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Req,
  BadRequestException,
} from '@nestjs/common';
import { EmergencyRequestsService } from './emergency-requests.service';
import { CreateEmergencyRequestDto } from './dtos/create-emergency-request.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('Emergency Requests')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('emergencyRequests')
export class EmergencyRequestsController {
  constructor(private readonly service: EmergencyRequestsService) {}

  @Post()
  @ApiOperation({ summary: '긴급 요청 생성' })
  @ApiResponse({ status: 201, description: '긴급 요청 생성 성공' })
  @ApiBody({ type: CreateEmergencyRequestDto })
  async create(@Req() req, @Body() dto: CreateEmergencyRequestDto) {
    const userId = req.user.userId;
    if (!userId) {
      throw new BadRequestException('User ID not found');
    }

    return this.service.createEmergencyRequest(userId, dto);
  }

  @Get()
  @ApiOperation({ summary: '내 긴급 요청 목록 조회' })
  @ApiResponse({ status: 200, description: '긴급 요청 목록 조회 성공' })
  async getMyRequests(@Req() req) {
    const userId = req.user.userId;
    if (!userId) {
      throw new BadRequestException('User ID not found');
    }

    return this.service.getMyRequests(userId);
  }
}
