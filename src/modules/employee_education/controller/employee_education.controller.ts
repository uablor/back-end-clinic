import { Controller, Get, Query, Param, Patch, Delete, Post, Body } from "@nestjs/common";
import { PaginationDto } from "src/shared/dto/paginationDto";
import { CreateEducationDto } from "../application/dto/create-employee_education.dto";
import { CreateEducationUseCase } from "../application/use-cases/command/create-employee_education.use-case";
import { GetOneEducationUseCase } from "../application/use-cases/query/get-one-employee_education.use-case";
import { UpdateEducationUseCase } from "../application/use-cases/command/update-employee_education.use-case";
import { HardDeleteEducationUseCase } from "../application/use-cases/command/hard-delete-employee_education.use-case";
import { UpdateEducationDto } from "../application/dto/update-employee_education.dto";
import { Employee_educationMapper } from "../mapper/employee_education.mapper";
import { Permissions } from "src/shared/decorators/permissions.decorator";

@Controller('education')
export class EmployeeEducationController {
    constructor(
        private readonly createEducationUseCase: CreateEducationUseCase,
        private readonly getOneEducationUseCase: GetOneEducationUseCase,
        private readonly updateEducationUseCase: UpdateEducationUseCase,
        private readonly hardDeleteEducationUseCase: HardDeleteEducationUseCase
    ) { }
    // @Permissions('create_Employee_education')
    @Post()
    async create(@Body() dto: CreateEducationDto) {
        return Employee_educationMapper.toResponse(await this.createEducationUseCase.execute(dto))
    }

    // @Permissions('get_one_Employee_education')
    @Get(':id')
    async getOne(@Param('id') id: number) {
        return Employee_educationMapper.toResponse(await this.getOneEducationUseCase.execute(id))
    }

    // @Permissions('update_Employee_education')
    @Patch(':id')
    async update(@Param('id') id: number, @Body() dto: UpdateEducationDto) {
        return Employee_educationMapper.toResponse(await this.updateEducationUseCase.execute(id, dto))
    }

    // @Permissions('hard_delete_Employee_education')
    @Delete('hard/:id')
    hardDelete(@Param('id') id: number) {
        return this.hardDeleteEducationUseCase.execute(id)
    }

}