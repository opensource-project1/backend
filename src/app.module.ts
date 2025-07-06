import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { BlockModule } from './block/block.module';
import { MypageModule } from './mypage/mypage.module';
import { EmergencyRequestsModule } from './emergency-requests/emergency-requests.module';
import { TodoModule } from './todo/todo.module';
import { FocusModule } from './focus/focus.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    PrismaModule,
    BlockModule,
    MypageModule,
    EmergencyRequestsModule,
    TodoModule,
    FocusModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
