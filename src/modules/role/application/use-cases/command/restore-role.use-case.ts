import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { RoleRepository } from "src/modules/role/domain/role.repository";

@Injectable()
export class RestoreRoleUseCase{
    constructor(
        @Inject('RoleRepository')
        private readonly roleRepository: RoleRepository
    ){}
    async execute(id: number): Promise<{ message: string }> {
        return this.roleRepository.restore(id);
    }
}