import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';

@Controller('api/auth')
export class AuthController {
  constructor(private jwtService: JwtService) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {
    // 구글 로그인 페이지로 리디렉션
  }

  @Get('google/redirect')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req, @Res() res) {
    const user = req.user;

    const payload = { email: user.email, name: user.name };
    const token = this.jwtService.sign(payload);

    // 프론트로 JWT 토큰 전달 (redirect)
    res.redirect(`${process.env.FRONTEND_URL}/login/success?token=${token}`);
  }

  @Get('profile')
  @UseGuards(AuthGuard('jwt'))
  getProfile(@Req() req) {
    return req.user;
  }
}
