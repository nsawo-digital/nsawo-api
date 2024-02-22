import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from './auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [UsersModule,
    JwtModule.registerAsync({ imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
      global: true,
      secret: configService.get('SECRET_KEY'),
      signOptions: { expiresIn: '3m' },
    }),
    inject: [ConfigService],
  }),
  ],
  controllers: [AuthController],
  providers: [AuthService, {
    provide: APP_GUARD,
    useClass: AuthGuard,
  }, ],
})
export class AuthModule {}
