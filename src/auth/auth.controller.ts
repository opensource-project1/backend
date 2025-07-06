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

    const payload = { email: user.email, name: user.name };
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
