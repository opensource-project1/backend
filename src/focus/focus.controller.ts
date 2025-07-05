import { Controller, Post, Query, Body, Get } from '@nestjs/common';
import { FocusService } from './focus.service';
import { CreateFocusDto } from './dtos/create-focus.dto';

@Controller('api/focus')
export class FocusController {
  constructor(private readonly focusService: FocusService) {}

  @Post()
  async startFocus(
    @Query('userId') userId: string,
    @Body() dto: CreateFocusDto,
  ) {
    const parsedUserId = Number(userId);
    if (isNaN(parsedUserId)) {
      throw new Error('Invalid userId');
    }

    return this.focusService.startFocus(parsedUserId, dto);
  }

  @Get()
  async getFocusSessionsByDate(
    @Query('userId') userId: string,
    @Query('date') date: string,
  ) {
    const parsedUserId = Number(userId);
    if (isNaN(parsedUserId)) {
      throw new Error('Invalid userId');
    }
    if (!date) {
      throw new Error('Date query parameter is required');
    }

    return this.focusService.getFocusSessionsByDate(parsedUserId, date);
  }
}
