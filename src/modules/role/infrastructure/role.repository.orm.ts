import { Injectable, NotFoundException } from "@nestjs/common";
import { RoleRepository } from "../domain/role.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { RoleEntity } from "src/infrastructure/typeorm/role.orm-entity";
import { Repository } from "typeorm";
import { Role } from "../domain/role";
import { RoleMapper } from "../mapper/role.mapper";
import { PaginationDto } from "src/shared/dto/paginationDto";
import { PaginatedResponse } from "src/shared/interface/pagination-response";
import { fetchWithPagination } from "src/shared/utils/pagination.builder";

@Injectable()
export class RoleRepositoryOrm implements RoleRepository {
    constructor(
        @InjectRepository(RoleEntity)
        private readonly roleRepository: Repository<RoleEntity>
    ) { }
    async save(role: Role): Promise<Role> {
        const entity = RoleMapper.toOrm(role);
        const savedEntity = await this.roleRepository.save({
            name: entity.name,
            display_name: entity.display_name,
            permissions: entity.permissions
        });
        return RoleMapper.toDomain(savedEntity);
    }

    async update(id: number, role: Role): Promise<Role> {
        const entity = RoleMapper.toOrm(role);
        const savedEntity = await this.roleRepository.save({
            id: id,
            name: entity.name,
            display_name: entity.display_name,
            permissions: entity.permissions
        });
        return RoleMapper.toDomain(savedEntity);
    }

    async findOne(id: number): Promise<Role | null> {
        const entity = await this.roleRepository.findOne({ where: { id: id }, relations: ['permissions'] });
        return entity ? RoleMapper.toDomain(entity) : null;
    }

    async findAll(query: PaginationDto): Promise<PaginatedResponse<Role>>{
        const qb = this.roleRepository.createQueryBuilder('role');

        qb.withDeleted().leftJoinAndSelect('role.permissions', 'permissions');
        return fetchWithPagination({
            qb,
            sort: query.sort,
            search: {
                kw: query.search,
                field: 'role.name'
            },
            is_active: query.is_active,
            page: Number(query.page) || 1,
            limit: Number(query.limit) || 10,
            toDomain: RoleMapper.toDomain,
        });
    }

    async hardDelete(id: number): Promise<{ message: string }> {
        await this.roleRepository.delete({ id: id });
        return { message: 'Role deleted successfully' };
    }

    async softDelete(id: number): Promise<{ message: string }> {
        await this.roleRepository.softDelete({ id: id });
        return { message: 'Role deleted successfully' };
    }

    async restore(id: number): Promise<{ message: string }> {
        const role = await this.roleRepository.findOne({ where: { id }, withDeleted: true });
        if (!role) throw new NotFoundException('Role not found');
        await this.roleRepository.restore({ id: id });
        return { message: 'Role restored successfully' };
    }
}