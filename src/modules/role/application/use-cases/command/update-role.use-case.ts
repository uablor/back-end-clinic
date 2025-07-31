import { Inject, Injectable } from "@nestjs/common";
import { RoleRepository } from "src/modules/role/domain/role.repository";
import { CreateRoleDto } from "../../dto/create-role.dto";
import { Role } from "src/modules/role/domain/role";
import { Permission } from "src/modules/permission/domain/permission";

@Injectable()
export class UpdateRoleUseCase{
    constructor(
        @Inject('RoleRepository')
        private readonly roleRepository: RoleRepository
    ){}

    async execute(id: number,dto: CreateRoleDto): Promise<Role> {
        const role = new Role({
            id: id,
            name: dto.name,
            display_name: dto.display_name,
            permissions: dto.permissions.map(p => new Permission({ id: p }))
        });

        return this.roleRepository.update(id,role);
    }
}