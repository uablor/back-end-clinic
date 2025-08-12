import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";

import { PaginationDto } from "src/shared/dto/paginationDto";
import { PaginatedResponse } from "src/shared/interface/pagination-response";
import { CreateClinicUseCase } from "../application/use-cases/command/create-clinic.use-case";
import { GetOneClinicUseCase } from "../application/use-cases/query/get-one-clinic.use-case";
import { GetAllClinicUseCase } from "../application/use-cases/query/get-all-clinic.use-case";
import { UpdateClinicUseCase } from "../application/use-cases/command/update-clinic.use-case";
import { SoftDeleteClinicUseCase } from "../application/use-cases/command/soft-delete-clinic.use-case";
import { HardDeleteClinicUseCase } from "../application/use-cases/command/hard-delete-clinic.use-case";
import { RestoreClinicUseCase } from "../application/use-cases/command/restore-clinic.use-case";
import { Public } from "src/shared/decorators/auth.decorator";
import { CreateClinicDto } from "../application/dto/create-clinic.dto";
import { ClinicMapper } from "../mapper/clinic.mapper";
import { Clinic } from "../domain/clinic";
import { UpdateClinicDto } from "../application/dto/update-clinic.dto";
import { ClinicResponse } from "../interface/clinic.interface";
import { UseAutoPermissions } from "src/shared/decorators/permissions.decorator";


@Controller('clinic')
@UseAutoPermissions()
export class ClinicController {
    constructor(
        private readonly createCliniceeUseCase: CreateClinicUseCase,
        private readonly getOneClinicUseCase: GetOneClinicUseCase,
        private readonly getAllClinicUseCase: GetAllClinicUseCase,
        private readonly updateClinicUseCase: UpdateClinicUseCase,
        private readonly softDeleteClinicUseCase: SoftDeleteClinicUseCase,
        private readonly hardDeleteClinicUseCase: HardDeleteClinicUseCase,
        private readonly restoreClinicUseCase: RestoreClinicUseCase
    ){}

    @Post()
    async create(@Body() Employee: CreateClinicDto){
        return await this.createCliniceeUseCase.execute(Employee);
    }
    // @Permissions('get_one_employee')
    @Get(':id')
    async getOne(@Param('id') id: number){
        return ClinicMapper.toResponse(await this.getOneClinicUseCase.execute(id));
    }

    // @Permissions('get_all_employee')
    @Get()
    async getAll(@Query() query: PaginationDto): Promise<PaginatedResponse<ClinicResponse>>{
        const Clinic = await this.getAllClinicUseCase.execute(query);
        return ClinicMapper.toResponseList(Clinic.data, Clinic.pagination);
    }

    // @Permissions('update_employee')
    @Patch(':id')
    async update(@Param('id') id: number , @Body() dto: UpdateClinicDto){
        return ClinicMapper.toResponse(await this.updateClinicUseCase.execute(id, dto));
    }

    // @Permissions('hard_delete_employee')
    @Delete('hard/:id')
    async hardDelete(@Param('id') id: number){
        return await this.hardDeleteClinicUseCase.execute(id);
    }

    // @Permissions('soft_delete_employee')
    @Delete('soft/:id')
    async softDelete(@Param('id') id: number){
        return await this.softDeleteClinicUseCase.execute(id);
    }

    // @Permissions('restore_employee')
    @Patch('restore/:id')
    async restore(@Param('id') id: number){
        return await this.restoreClinicUseCase.execute(id);
    }
}