import { Controller, Get, Query } from "@nestjs/common";
import { GetAllDistrictUseCase } from "../application/query/get-all-district.use-case";
import { District } from "../domain/district";

@Controller('district')
export class DistrictController {
    constructor(
        private readonly getAllDistrictUseCase: GetAllDistrictUseCase
    ){}
    @Get()
    async getAll(@Query('id') id: number): Promise<District[]> {
        return await this.getAllDistrictUseCase.execute(id);
    }
}