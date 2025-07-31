
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './application/use-cases/query/jwt.strategy';
import { LoginUseCase } from './application/use-cases/command/login.use-case';
import { UserModule } from '../user/user.module';
import { AuthController } from './controller/auth.controller';

@Module({
    imports: [
        UserModule,
        PassportModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (config) => ({
                secret: config.getOrThrow('JWT_SECRET'),
                signOptions: {
                    expiresIn: config.getOrThrow('JWT_EXPIRATION')
                }
            })
        }),
    ],
    controllers: [AuthController],
    providers:[JwtStrategy,LoginUseCase],
    exports: [JwtModule]
})
export class AuthModule { }
