import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { User } from "src/modules/user/domain/user";
import { UserRepository } from "src/modules/user/domain/user.repository";

@Injectable()
export class GetOneUserUseCase {
    constructor(
        @Inject('UserRepository') private readonly userRepository: UserRepository
    ) { }

    async execute(id:number): Promise<User> { 
        const user = await this.userRepository.findOne(id);
        if (!user) throw new NotFoundException('User not found');
        return user
    }
}