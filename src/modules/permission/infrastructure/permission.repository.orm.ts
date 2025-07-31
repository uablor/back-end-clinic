import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { PermissionsEntity } from "src/infrastructure/typeorm/permissions.orm-entity";
import { Repository } from "typeorm";
import { PermissionRepository } from "../domain/permission.repository";
import { Permission } from "../domain/permission";
import { PermissionMapper } from "../mapper/permission.mapper";

@Injectable()
export class PermissionRepositoryOrm implements PermissionRepository {
    constructor(
        @InjectRepository(PermissionsEntity)
        private readonly permissionRepository: Repository<PermissionsEntity>
    ) { }

    async getAllPermission(): Promise<Permission[]> {
        const entities = await this.permissionRepository.find();
        return entities.map(PermissionMapper.toDomain);
    }

}