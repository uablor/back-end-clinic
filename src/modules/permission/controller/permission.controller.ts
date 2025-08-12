import { Controller, Get } from "@nestjs/common";
import { GetAllPermssionUseCase } from "../application/use-cases/query/get-all-permission.use-case";
import { Permissions, UseAutoPermissions } from "src/shared/decorators/permissions.decorator";

@Controller('permission')
@UseAutoPermissions()
export class PermissionController {
    constructor(
        private readonly getAllPermssionUseCase: GetAllPermssionUseCase
    ) { }
    @Get()
    getAll() {
        return this.getAllPermssionUseCase.execute()
    }
}