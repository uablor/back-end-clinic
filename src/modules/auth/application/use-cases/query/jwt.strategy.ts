
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthPayload } from 'src/modules/auth/interface/auth.interface';
import { UserRepository } from 'src/modules/user/domain/user.repository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        configService: ConfigService,
        @Inject('UserRepository') private readonly userRepository: UserRepository
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.getOrThrow('JWT_SECRET'),
        });
    }
    async validate(payload: any) {
        const user = await this.userRepository.findOne(payload.id);
        if (!user) throw new UnauthorizedException('Invalid token');

        const rolePermissions = user.roles.flatMap((role) => role.permissions);
        const allPermissions = [...(user.permissions || []), ...rolePermissions];
        const uniquePermissions = Array.from(
            new Map(allPermissions.map((p) => [p.name, p])).values()
        );

        user.permissions = uniquePermissions;

        return user;
    }
}
