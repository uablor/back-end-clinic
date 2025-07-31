import { Module } from "@nestjs/common";
import { RoleController } from "./controller/role.controller";
import { RoleRepositoryOrm } from "./infrastructure/role.repository.orm";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RoleEntity } from "src/infrastructure/typeorm/role.orm-entity";
import { CreateRoleUseCase } from "./application/use-cases/command/create-role.use-case";
import { HardDeleteRoleUseCase } from "./application/use-cases/command/hard-delete-role.use-case";
import { SoftDeleteRoleUseCase } from "./application/use-cases/command/soft-delete-role.use-case";
import { UpdateRoleUseCase } from "./application/use-cases/command/update-role.use-case";
import { GetAllRoleUseCase } from "./application/use-cases/query/get-all-role.use-case";
import { GetOneRoleUseCase } from "./application/use-cases/query/get-one-role.use-case";
import { RestoreRoleUseCase } from "./application/use-cases/command/restore-role.use-case";

@Module({
    imports:[TypeOrmModule.forFeature([RoleEntity])],
    controllers: [RoleController],
    providers: [
        {
            provide: 'RoleRepository',
            useClass: RoleRepositoryOrm
        },
        CreateRoleUseCase,
        HardDeleteRoleUseCase,
        SoftDeleteRoleUseCase,
        UpdateRoleUseCase,
        GetAllRoleUseCase,
        GetOneRoleUseCase,
        RestoreRoleUseCase
    ],
    exports: []
})
export class RoleModule {}