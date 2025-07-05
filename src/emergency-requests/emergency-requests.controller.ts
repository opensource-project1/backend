import {
  Controller,
  Post,
  Body,
  Query,
  Get,
  BadRequestException,
} from '@nestjs/common';
import { EmergencyRequestsService } from './emergency-requests.service';
import { CreateEmergencyRequestDto } from './dtos/create-emergency-request.dto';

import { ApiTags, ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';

@ApiTags('Emergency Requests')
@Controller('api/emergencyRequests')
export class EmergencyRequestsController {
  constructor(private readonly service: EmergencyRequestsService) {}

  @Post()
  @ApiOperation({ summary: '긴급 요청 생성' })
  @ApiQuery({
    name: 'userId',
    type: Number,
    description: '사용자 ID',
    required: true,
  })
  @ApiResponse({ status: 201, description: '긴급 요청 생성 성공' })
  @ApiResponse({ status: 400, description: '유효하지 않은 userId' })
  async create(
    @Query('userId') userId: string,
    @Body() dto: CreateEmergencyRequestDto,
  ) {
    const parsedUserId = Number(userId);
    if (isNaN(parsedUserId)) {
      throw new BadRequestException('Invalid userId');
    }

    return this.service.createEmergencyRequest(parsedUserId, dto);
  }

  @Get()
  @ApiOperation({ summary: '내 긴급 요청 목록 조회' })
  @ApiQuery({
    name: 'userId',
    type: Number,
    description: '사용자 ID',
    required: true,
  })
  @ApiResponse({ status: 200, description: '긴급 요청 목록 조회 성공' })
  @ApiResponse({ status: 400, description: '유효하지 않은 userId' })
  async getMyRequests(@Query('userId') userId: string) {
    const parsedUserId = Number(userId);
    if (isNaN(parsedUserId)) {
      throw new BadRequestException('Invalid userId');
    }

    return this.service.getMyRequests(parsedUserId);
  }
}
