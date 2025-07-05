import { Controller, Get, Query, BadRequestException } from '@nestjs/common';
import { MypageService } from './mypage.service';
import { MyPageResponseDto } from './dtos/response.dto';

import { ApiTags, ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';

@ApiTags('My Page')
@Controller('api/my-page')
export class MypageController {
  constructor(private readonly mypageService: MypageService) {}

  @Get()
  @ApiOperation({ summary: '마이페이지 정보 조회' })
  @ApiQuery({
    name: 'userId',
    type: Number,
    description: '사용자 ID',
    required: true,
  })
  @ApiResponse({ status: 200, description: '성공', type: MyPageResponseDto })
  @ApiResponse({ status: 400, description: 'userId가 유효하지 않을 때' })
  async getMyPage(
    @Query('userId') userIdStr: string,
  ): Promise<MyPageResponseDto> {
    const userId = parseInt(userIdStr, 10);

    if (isNaN(userId)) {
      throw new BadRequestException('userId must be a valid number');
    }

    return this.mypageService.getMyPageData(userId);
  }
}
