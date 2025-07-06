import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback, Profile } from 'passport-google-oauth20';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    console.log('✅ GOOGLE_CLIENT_ID:', process.env.GOOGLE_CLIENT_ID);
    console.log('✅ GOOGLE_CALLBACK_URL:', process.env.GOOGLE_CALLBACK_URL);
    super({
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: process.env.GOOGLE_CALLBACK_URL!,
      scope: ['email', 'profile'],
    });
    console.log('GoogleStrategy callbackURL:', process.env.GOOGLE_CALLBACK_URL);
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: VerifyCallback,
  ): Promise<void> {
    const { name, emails, photos } = profile;

    const user = {
      email: emails?.[0].value,
      name: name?.givenName,
      picture: photos?.[0].value,
      accessToken,
    };

    done(null, user);
  }
}
