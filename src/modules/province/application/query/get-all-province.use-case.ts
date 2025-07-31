import { Inject, Injectable } from "@nestjs/common";
import { ProvinceRepository } from "../../domain/province.repository";
import { Province } from "../../domain/province";

@Injectable()
export class GetAllProvinceUseCase {
    constructor(
        @Inject('ProvinceRepository') private readonly provinceRepository: ProvinceRepository
    ){}
    async execute(id: number): Promise<Province[]> {
        return await this.provinceRepository.getAll(id);
    }
}