import { Module } from "@nestjs/common";
import { PermissionRepositoryOrm } from "./infrastructure/permission.repository.orm";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PermissionsEntity } from "src/infrastructure/typeorm/permissions.orm-entity";
import { PermissionController } from "./controller/permission.controller";
import { GetAllPermssionUseCase } from "./application/use-cases/query/get-all-permssion.use-case";

@Module({
    imports: [TypeOrmModule.forFeature([PermissionsEntity])],
    controllers: [PermissionController],
    providers: [
        {
            provide: 'PermissionRepository',
            useClass: PermissionRepositoryOrm
        },
        GetAllPermssionUseCase
    ],
    exports: []
})
export class PermissionModule { }