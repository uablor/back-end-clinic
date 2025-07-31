import { Inject, Injectable } from "@nestjs/common";
import { UserRepository } from "src/modules/user/domain/user.repository";

@Injectable()
export class HardDeleteUserUseCase {
    constructor(
        @Inject('UserRepository') private readonly userRepository: UserRepository
    ) { }
    async execute(id: number): Promise<{ message: string }> {
        return await this.userRepository.hardDelete(id);
    }
}