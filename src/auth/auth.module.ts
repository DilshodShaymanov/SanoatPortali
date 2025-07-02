import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AdminModule } from '../admin/admin.module';
import { UsersModule } from '../users/users.module';
import { MailModule } from '../mail/mail.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    AdminModule,
    UsersModule,
    MailModule,
    JwtModule.register({
      global: true,
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
