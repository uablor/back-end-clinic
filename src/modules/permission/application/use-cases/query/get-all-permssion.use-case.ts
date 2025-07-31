import { Inject, Injectable } from "@nestjs/common";
import { PermissionRepository } from "src/modules/permission/domain/permission.repository";

@Injectable()
export class GetAllPermssionUseCase {
    constructor(
        @Inject('PermissionRepository')
        private readonly permissionRepository: PermissionRepository
    ) {

    }
    async execute(){
        return this.permissionRepository.getAllPermission()
    }
}