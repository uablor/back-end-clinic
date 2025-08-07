import { Inject, Injectable } from "@nestjs/common";
import { Province } from "src/modules/province/domain/province";
import { ProvinceRepository } from "src/modules/province/domain/province.repository";

@Injectable()
export class GetAllProvinceUseCase {
    constructor(
        @Inject('ProvinceRepository') private readonly provinceRepository: ProvinceRepository
    ){}
    async execute(id: number): Promise<Province[]> {
        return await this.provinceRepository.getAll(id);
    }
}