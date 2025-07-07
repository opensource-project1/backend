import {
  Controller,
  Get,
  Req,
  Res,
  UseGuards,
  Post,
  Body,
} from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';

@Controller('auth')
export class AuthController {
  constructor(private jwtService: JwtService) {}

  @Get('/google/login')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {}

  @Get('/google/redirect')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req, @Res() res) {
    const user = req.user;

    // user 객체에 고유 id가 있다고 가정 (보통 user.id 혹은 user.sub)
    // 실제 user 객체 구조에 맞게 고유 ID 필드명을 맞춰야 합니다.
    const userId = user.id || user.sub;
    if (!userId) {
      return res.status(400).send('User ID not found in Google profile');
    }

    const payload = { sub: userId, email: user.email, name: user.name };
    const token = this.jwtService.sign(payload);

    res.redirect(`${process.env.FRONTEND_URL}/login/success?token=${token}`);
  }

  @Get('profile')
  @UseGuards(AuthGuard('jwt'))
  getProfile(@Req() req) {
    return req.user;
  }

  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        userId: { type: 'string', example: 'test123' },
        email: { type: 'string', example: 'test@example.com' },
      },
    },
  })
  @Post('test-token')
  getTestToken(@Body() body: { userId: string; email: string }) {
    const payload = { sub: body.userId, email: body.email };
    const token = this.jwtService.sign(payload);
    return { accessToken: token };
  }
}
