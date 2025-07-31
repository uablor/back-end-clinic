import { PermissionsEntity } from "src/infrastructure/typeorm/permissions.orm-entity";

export class PermissionMapper {
    static toDomain(permission:PermissionsEntity) {
        return {
            id: permission.id,
            name: permission.name,
            display_name: permission.display_name,
            createdAt: permission.createdAt,
            updatedAt: permission.updatedAt,
            deletedAt: permission.deletedAt,
        };
    }
}