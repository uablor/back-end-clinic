import { Inject, Injectable } from "@nestjs/common";
import { User } from "src/modules/user/domain/user";
import { UserRepository } from "src/modules/user/domain/user.repository";
import { PaginationDto } from "src/shared/dto/paginationDto";
import { PaginatedResponse } from "src/shared/interface/pagination-response";

@Injectable()
export class GetAllUserUseCase {
    constructor(
        @Inject('UserRepository') private readonly userRepository: UserRepository
    ){}
    async execute(query: PaginationDto): Promise<PaginatedResponse<User>> {
        return this.userRepository.findAll(query);
    }
}