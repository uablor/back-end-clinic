import { formatTimeStamp, formatTimeUtil } from "src/shared/utils/formatTime.util";
import { IPagination } from "src/shared/interface/pagination-interface";
import { EmployeeEntity } from "src/infrastructure/typeorm/employee.orm-entity";
import { RoleEntity } from "src/infrastructure/typeorm/role.orm-entity";
import { Role } from "../domain/role";
import { PermissionsEntity } from "src/infrastructure/typeorm/permissions.orm-entity";


export class RoleMapper {

    static toDomain(entity: RoleEntity): Role {
        return new Role({
            id: entity.id,
            name: entity.name,
            display_name: entity.display_name,
            permissions: entity.permissions,
            createdAt: entity.createdAt,
            updatedAt: entity.updatedAt,
            deletedAt: entity.deletedAt
        });
    }

    static toOrm(domain: Role): RoleEntity {
        const entity = new RoleEntity();
        if (domain.id !== undefined) entity.id = domain.id;
        entity.name = domain.name;
        entity.display_name = domain.display_name;
        entity.permissions = domain.permissions.map(p => {
            const permissionEntity = new PermissionsEntity();
            permissionEntity.id = p.id!;
            return permissionEntity;
        });
        return entity;
    }
    static toResponse(domain: Role) {
        return {
            id: domain.id!,
            name: domain.name,
            display_name: domain.display_name,
            permissions: domain.permissions.map(p => ({
                id: p.id,
                name: p.name || '',
                display_name: p.display_name || '',
                ...formatTimeStamp(p.createdAt, p.updatedAt, p.deletedAt)
            })),
            ...formatTimeStamp(domain.createdAt, domain.updatedAt, domain.deletedAt)
        };
    }
    static toResponseList(users: Role[], pagination: IPagination) {
        return {
            data: users.map(user => this.toResponse(user)),
            pagination
        };
    }
}

