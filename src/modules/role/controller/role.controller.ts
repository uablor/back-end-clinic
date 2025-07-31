import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { CreateRoleDto } from "../application/dto/create-role.dto";
import { CreateRoleUseCase } from "../application/use-cases/command/create-role.use-case";
import { HardDeleteRoleUseCase } from "../application/use-cases/command/hard-delete-role.use-case";
import { SoftDeleteRoleUseCase } from "../application/use-cases/command/soft-delete-role.use-case";
import { UpdateRoleUseCase } from "../application/use-cases/command/update-role.use-case";
import { GetAllRoleUseCase } from "../application/use-cases/query/get-all-role.use-case";
import { GetOneRoleUseCase } from "../application/use-cases/query/get-one-role.use-case";
import { RestoreRoleUseCase } from "../application/use-cases/command/restore-role.use-case";
import { PaginationDto } from "src/shared/dto/paginationDto";
import { PaginatedResponse } from "src/shared/interface/pagination-response";
import { RoleMapper } from "../mapper/role.mapper";
import { ResponceRole } from "../interface/role.interface";
import { Permissions } from "src/shared/decorators/permissions.decorator";

@Controller('role')
export class RoleController {
    constructor(
        private readonly createRoleUseCase: CreateRoleUseCase,
        private readonly hardDeleteRoleUseCase: HardDeleteRoleUseCase,
        private readonly softDeleteRoleUseCase: SoftDeleteRoleUseCase,
        private readonly updateRoleUseCase: UpdateRoleUseCase,
        private readonly getAllRoleUseCase: GetAllRoleUseCase,
        private readonly getOneRoleUseCase: GetOneRoleUseCase,
        private readonly restoreRoleUseCase: RestoreRoleUseCase
    ) { }
    @Permissions('create_role')
    @Post()
    async createRole(@Body() dto: CreateRoleDto): Promise<ResponceRole> {
        return RoleMapper.toResponse(await this.createRoleUseCase.execute(dto));
    }
    @Permissions('get_all_role')
    @Get()
    async getAllRole(@Query() query: PaginationDto): Promise<PaginatedResponse<ResponceRole>> {
        const roles = await this.getAllRoleUseCase.execute(query);
        return RoleMapper.toResponseList(roles.data, roles.pagination);
    }
    @Permissions('get_one_role')
    @Get(':id')
    async getOneRole(@Param('id') id: number): Promise<ResponceRole> {
        return RoleMapper.toResponse(await this.getOneRoleUseCase.execute(id));
    }
    @Permissions('update_role')
    @Patch(':id')
    async updateRole(@Param('id') id: number, @Body() dto: CreateRoleDto): Promise<ResponceRole> {
        return RoleMapper.toResponse(await this.updateRoleUseCase.execute(id, dto));
    }
    @Permissions('hard_delete_role')
    @Delete('hard/:id')
    async hardDeleteRole(@Param('id') id: number): Promise<{ message: string }> {
        return await this.hardDeleteRoleUseCase.execute(id);
    }
    @Permissions('soft_delete_role')
    @Delete('soft/:id')
    async softDeleteRole(@Param('id') id: number): Promise<{ message: string }> {
        return await this.softDeleteRoleUseCase.execute(id);
    }
    @Permissions('restore_role')
    @Patch('restore/:id')
    async restoreRole(@Param('id') id: number): Promise<{ message: string }> {
        return await this.restoreRoleUseCase.execute(id);
    }
}