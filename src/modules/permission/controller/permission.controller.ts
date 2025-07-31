import { Controller, Get } from "@nestjs/common";
import { GetAllPermssionUseCase } from "../application/use-cases/query/get-all-permssion.use-case";
import { Permissions } from "src/shared/decorators/permissions.decorator";

@Controller('permission')
export class PermissionController {
    constructor(
        private readonly getAllPermssionUseCase: GetAllPermssionUseCase
    ) { }
    @Permissions('get_all_permssion')
    @Get()
    getAll() {
        return this.getAllPermssionUseCase.execute()
    }
}