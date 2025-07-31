import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { Role } from "src/modules/role/domain/role";
import { RoleRepository } from "src/modules/role/domain/role.repository";
import { PaginationDto } from "src/shared/dto/paginationDto";
import { PaginatedResponse } from "src/shared/interface/pagination-response";

@Injectable()
export class GetAllRoleUseCase{
    constructor(
        @Inject('RoleRepository')
        private readonly roleRepository: RoleRepository
    ){}
    async execute(query: PaginationDto): Promise<PaginatedResponse<Role>> {
        return this.roleRepository.findAll(query);
    }
}