import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { User } from "src/modules/user/domain/user";
import { UserRepository } from "src/modules/user/domain/user.repository";

@Injectable()
export class GetUserByEmailUseCase {
    constructor(
        @Inject('UserRepository') private readonly userRepository: UserRepository
    ) { }

    async execute(email:string): Promise<User> {  
        const user = await this.userRepository.findByEmail(email);
        if (!user) throw new NotFoundException('User not found');
        return user
    }
}