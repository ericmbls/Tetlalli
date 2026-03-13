import { Module } from '@nestjs/common';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { StringValue } from 'ms';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  imports: [
    ConfigModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService): JwtModuleOptions => ({
        secret: config.get<string>('JWT_SECRET') ?? 'supersecret',
        signOptions: {
          expiresIn: (config.get<string>('JWT_EXPIRES_IN') ?? '1d') as StringValue,
        },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, PrismaService, JwtStrategy],
})
export class AuthModule {}