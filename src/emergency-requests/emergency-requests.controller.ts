import { Controller, Post, Body, Query } from '@nestjs/common';
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
}
