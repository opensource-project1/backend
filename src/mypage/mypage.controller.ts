import { Controller, Get, Query, BadRequestException } from '@nestjs/common';
import { MypageService } from './mypage.service';
import { MyPageResponseDto } from './dtos/response.dto';

@Controller('api/my-page')
export class MypageController {
  constructor(private readonly mypageService: MypageService) {}

  @Get()
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
