import { Controller, Get, Query } from "@nestjs/common";
import { GetAllProvinceUseCase } from "../application/query/get-all-province.use-case";
import { Province } from "../domain/province";

@Controller('province')
export class ProvinceController {
    constructor(
        private readonly getAllProvinceUseCase: GetAllProvinceUseCase
    ){}

    @Get()
    async getAll(@Query('id') id: number): Promise<Province[]> {
        return await this.getAllProvinceUseCase.execute(id);
    }
}