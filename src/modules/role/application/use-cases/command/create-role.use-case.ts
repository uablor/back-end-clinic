import { Inject, Injectable } from "@nestjs/common";
import { RoleRepository } from "src/modules/role/domain/role.repository";
import { CreateRoleDto } from "../../dto/create-role.dto";
import { Role } from "src/modules/role/domain/role";
import { Permission } from "src/modules/permission/domain/permission";

@Injectable()
export class CreateRoleUseCase{
    constructor(
        @Inject('RoleRepository')
        private readonly roleRepository: RoleRepository
    ){}

    async execute(dto: CreateRoleDto): Promise<Role> {
        const role = new Role({
            name: dto.name,
            display_name: dto.display_name,
            permissions: dto.permissions.map(p => new Permission({ id: p }))
        });

        return this.roleRepository.save(role);
    }
}