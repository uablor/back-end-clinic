import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { CreateEmployeeUseCase } from "../application/use-cases/command/create-employee.use-case";

import { GetOneEmployeeUseCase } from "../application/use-cases/query/get-one-employee.use-case";

import { PaginationDto } from "src/shared/dto/paginationDto";
import { GetAllEmployeeUseCase } from "../application/use-cases/query/get-all-employee.use-case";
import { PaginatedResponse } from "src/shared/interface/pagination-response";

import { UpdateEmployeeUseCase } from "../application/use-cases/command/update-employee.use-case";

import { SoftDeleteEmployeeUseCase } from "../application/use-cases/command/soft-delete-employee.use-case";
import { HardDeleteEmployeeUseCase } from "../application/use-cases/command/hard-delete-employee.use-case";
import { RestoreEmployeeUseCase } from "../application/use-cases/command/restore-employee.use-case";
import { Permissions } from "src/shared/decorators/permissions.decorator";
import { Public } from "src/shared/decorators/auth.decorator";
import { CreateEmployeeDto } from "../application/dto/create-employee.dto";
import { EmployeeMapper } from "../mapper/employee.mapper";
import { EmployeeResponse } from "../interface/employee.interface";
import { UpdateEmployeeDto } from "../application/dto/update-employee.dto";

@Controller('employees')
export class EmployeeController {
    constructor(
        private readonly createEmployeeUseCase: CreateEmployeeUseCase,
        private readonly getOneEmployeeUseCase: GetOneEmployeeUseCase,
        private readonly getAllEmployeeUseCase: GetAllEmployeeUseCase,
        private readonly updateEmployeeUseCase: UpdateEmployeeUseCase,
        private readonly softDeleteEmployeeUseCase: SoftDeleteEmployeeUseCase,
        private readonly hardDeleteEmployeeUseCase: HardDeleteEmployeeUseCase,
        private readonly restoreEmployeeUseCase: RestoreEmployeeUseCase
    ){}
    @Public()
    @Post()
    async create(@Body() Employee: CreateEmployeeDto){
        return await this.createEmployeeUseCase.execute(Employee);
    }
    // @Permissions('get_one_employee')
    @Get(':id')
    async getOne(@Param('id') id: number){
        return EmployeeMapper.toResponse(await this.getOneEmployeeUseCase.execute(id));
    }
    // @Permissions('get_all_employee')
    @Get()
    async getAll(@Query() query: PaginationDto): Promise<PaginatedResponse<EmployeeResponse>>{
        const Employees = await this.getAllEmployeeUseCase.execute(query);
        return EmployeeMapper.toResponseList(Employees.data, Employees.pagination);
    }
    // @Permissions('update_employee')
    @Patch(':id')
    async update(@Param('id') id: number , @Body() dto: UpdateEmployeeDto){
        return EmployeeMapper.toResponse(await this.updateEmployeeUseCase.execute(id, dto));
    }
    // @Permissions('hard_delete_employee')
    @Delete('hard/:id')
    async hardDelete(@Param('id') id: number){
        return await this.hardDeleteEmployeeUseCase.execute(id);
    }
    // @Permissions('soft_delete_employee')
    @Delete('soft/:id')
    async softDelete(@Param('id') id: number){
        return await this.softDeleteEmployeeUseCase.execute(id);
    }
    // @Permissions('restore_employee')
    @Patch('restore/:id')
    async restore(@Param('id') id: number){
        return await this.restoreEmployeeUseCase.execute(id);
    }
}