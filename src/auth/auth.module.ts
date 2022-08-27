import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../modules/user.module'
import { JwtStrategy } from './strategies/jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

@Module({
    imports: [
        UserModule,
        PassportModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => {
                const secret = configService.get('JWT_SECRET');
                const expriresIn = configService.get('JWT_EXPIRATION_TIME');
                return {
                    secret,
                    signOptions: {
                        expiresIn: expriresIn ? `${expriresIn}s` : '1y',
                    },
                };
            },
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy],
})
export class AuthModule {};