import { Controller, Get, Query } from "@nestjs/common";

import { Province } from "../domain/province";
import { GetAllProvinceUseCase } from "../application/use-cases/query/get-all-province.use-case";

@Controller('province')
// @UseAutoPermissions()
export class ProvinceController {
    constructor(
        private readonly getAllProvinceUseCase: GetAllProvinceUseCase
    ){}

    @Get()
    async getAll(@Query('id') id: number): Promise<Province[]> {
        return await this.getAllProvinceUseCase.execute(id);
    }
}