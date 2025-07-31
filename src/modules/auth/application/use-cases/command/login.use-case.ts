import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { LoginDto } from "../../dto/create-auth.dto";
import { JwtService } from "@nestjs/jwt";
import { UserRepository } from "src/modules/user/domain/user.repository";
import { comparePassword } from "src/shared/utils/bcrypt.util";

@Injectable()
export class LoginUseCase {
    constructor(
        private readonly jwtService: JwtService,
        @Inject('UserRepository')
        private readonly userRepository: UserRepository
    ) { }
    async execute(dto: LoginDto): Promise<{ accessToken: string }> {
        const user = await this.userRepository.findByEmail(dto.email);
        if (!user) throw new BadRequestException('Invalid credentials');
        if(!user.is_verified) throw new BadRequestException('User is not verified');
        const isPasswordValid = await comparePassword(dto.password, user.password);
        if (!isPasswordValid) throw new BadRequestException('Invalid credentials');
        const rolePermissions = user.roles.flatMap(role => role.permissions);
        const allPermissions = [...(user.permissions || []), ...rolePermissions];
        const uniquePermissions = Array.from(
            new Map(allPermissions.map(p => [p.name, p])).values()
        ).map(p => p.name);
        const payload = {
            sub: user.id,
            email: user.email,
            permissions: uniquePermissions,
        };

        const accessToken = this.jwtService.sign(payload);
        return { accessToken };
    }
}