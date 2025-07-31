import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { RoleRepository } from "src/modules/role/domain/role.repository";

@Injectable()
export class HardDeleteRoleUseCase {
    constructor(
        @Inject('RoleRepository')
        private readonly roleRepository: RoleRepository
    ) { }
    async execute(id: number): Promise<{ message: string }> {
        const role = await this.roleRepository.findOne(id);
        if (!role) throw new NotFoundException('Role not found');
        return this.roleRepository.hardDelete(id);
    }
}