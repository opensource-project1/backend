import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  Body,
  Req,
  UseGuards,
  BadRequestException,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiParam,
  ApiResponse,
} from '@nestjs/swagger';
import { BlockService } from './block.service';
import { CreateBlockDto } from './dtos/create-block.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('Block')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('block')
export class BlockController {
  constructor(private readonly blockService: BlockService) {}

  @Post()
  @ApiOperation({ summary: '웹사이트 차단 등록' })
  @ApiResponse({ status: 201, description: '차단 사이트 등록 완료' })
  async create(@Req() req, @Body() dto: CreateBlockDto) {
    const userId = req.user.userId;
    if (!userId) {
      throw new BadRequestException('User ID not found');
    }
    return this.blockService.create(userId, dto);
  }

  @Get()
  @ApiOperation({ summary: '차단된 사이트 전체 조회' })
  @ApiResponse({ status: 200, description: '전체 차단 목록 반환' })
  async findAll(@Req() req) {
    const userId = req.user.userId;
    if (!userId) {
      throw new BadRequestException('User ID not found');
    }
    return this.blockService.findAll(userId);
  }

  @Get(':id')
  @ApiOperation({ summary: '특정 차단 항목 조회' })
  @ApiParam({ name: 'id', description: '차단 ID' })
  @ApiResponse({ status: 200, description: 'ID에 해당하는 차단 항목 반환' })
  async findOne(@Req() req, @Param('id') id: string) {
    const userId = req.user.userId;
    if (!userId) {
      throw new BadRequestException('User ID not found');
    }
    return this.blockService.findOne(userId, +id);
  }

  @Delete(':id')
  @ApiOperation({ summary: '차단 해제 (삭제)' })
  @ApiParam({ name: 'id', description: '차단 해제할 ID' })
  @ApiResponse({ status: 200, description: '삭제 완료' })
  async remove(@Req() req, @Param('id') id: string) {
    const userId = req.user.userId;
    if (!userId) {
      throw new BadRequestException('User ID not found');
    }
    return this.blockService.remove(userId, +id);
  }
}
