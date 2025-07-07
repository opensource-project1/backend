import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { MypageService } from './mypage.service';
import { MyPageResponseDto } from './dtos/response.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';

@ApiTags('My Page')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('my-page')
export class MypageController {
  constructor(private readonly mypageService: MypageService) {}

  @Get()
  @ApiOperation({ summary: '마이페이지 정보 조회' })
  @ApiResponse({ status: 200, description: '성공', type: MyPageResponseDto })
  async getMyPage(@Req() req): Promise<MyPageResponseDto> {
    console.log('req.user:', req.user);
    const userId = req.user.userId; // JwtStrategy validate에서 설정한 userId

    return this.mypageService.getMyPageData(userId);
  }
}
