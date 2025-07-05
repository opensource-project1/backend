import { Controller, Post, Body, Query, Get } from '@nestjs/common';
import { EmergencyRequestsService } from './emergency-requests.service';
import { CreateEmergencyRequestDto } from './dtos/create-emergency-request.dto';

@Controller('api/emergencyRequests')
export class EmergencyRequestsController {
  constructor(private readonly service: EmergencyRequestsService) {}

  @Post()
  async create(
    @Query('userId') userId: string,
    @Body() dto: CreateEmergencyRequestDto,
  ) {
    const parsedUserId = Number(userId);
    if (isNaN(parsedUserId)) {
      throw new Error('Invalid userId');
    }

    return this.service.createEmergencyRequest(parsedUserId, dto);
  }

  @Get()
  async getMyRequests(@Query('userId') userId: string) {
    const parsedUserId = Number(userId);
    if (isNaN(parsedUserId)) {
      throw new Error('Invalid userId');
    }

    return this.service.getMyRequests(parsedUserId);
  }
}
