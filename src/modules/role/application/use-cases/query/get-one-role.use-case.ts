import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { Role } from "src/modules/role/domain/role";
import { RoleRepository } from "src/modules/role/domain/role.repository";
import { PaginationDto } from "src/shared/dto/paginationDto";
import { PaginatedResponse } from "src/shared/interface/pagination-response";

@Injectable()
export class GetOneRoleUseCase{
    constructor(
        @Inject('RoleRepository')
        private readonly roleRepository: RoleRepository
    ){}
    async execute(id: number): Promise<Role> {
        const role = await this.roleRepository.findOne(id);
        if(!role) throw new NotFoundException('Role not found');
        return role
    }
}