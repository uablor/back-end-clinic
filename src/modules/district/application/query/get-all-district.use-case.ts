import { Inject, Injectable } from "@nestjs/common";
import { DistrictRepository } from "../../domain/district.repository";
import { District } from "../../domain/district";


@Injectable()
export class GetAllDistrictUseCase {
    constructor(
        @Inject('DistrictRepository') private readonly districtRepository: DistrictRepository
    ){}
    async execute(id: number): Promise<District[]> {
        return await this.districtRepository.getAll(id);
    }
}