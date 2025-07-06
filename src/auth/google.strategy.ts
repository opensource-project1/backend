import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback, Profile } from 'passport-google-oauth20';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private readonly prisma: PrismaService) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: process.env.GOOGLE_CALLBACK_URL!,
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: VerifyCallback,
  ): Promise<void> {
    const { id, name, emails } = profile;

    let user = await this.prisma.user.findUnique({
      where: { googleId: id },
    });

    if (!user) {
      user = await this.prisma.user.create({
        data: {
          googleId: id,
          email: emails?.[0].value ?? '',
          name: name?.givenName ?? '',
          password: '',
        },
      });
    }

    done(null, user);
  }
}
