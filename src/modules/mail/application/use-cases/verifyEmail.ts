import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { GetUserByEmailUseCase } from "src/modules/user/application/use-cases/query/get-email-user.use-case";
import { UserRepository } from "src/modules/user/domain/user.repository";

@Injectable()
export class VerifyEmail {
    constructor(
        private readonly jwtService: JwtService,
        private readonly getUserByEmailUseCase:GetUserByEmailUseCase,
        @Inject('UserRepository') private readonly userRepository: UserRepository
    ){}

    async execute(token: string): Promise<{message:string}> {
        const payload = await this.jwtService.decode(token);
        const isUser = await this.getUserByEmailUseCase.execute(payload.email);
        // console.log(isUser);
        if(!isUser) throw new NotFoundException('User not found');
        isUser.is_verified = true;
        await this.userRepository.save(isUser);
        return {message:'User verified'};
    }
}