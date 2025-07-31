import { Inject, Injectable } from "@nestjs/common";
import { Clinic } from "src/modules/clinic/domain/clinic";
import { ClinicRepository } from "src/modules/clinic/domain/clinic.repository";
import { PaginationDto } from "src/shared/dto/paginationDto";
import { PaginatedResponse } from "src/shared/interface/pagination-response";

@Injectable()
export class GetAllClinicUseCase {
    constructor(
        @Inject('ClinicRepository') private readonly clinicRepository: ClinicRepository
    ) { }

    async execute(query: PaginationDto): Promise<PaginatedResponse<Clinic>> {
        return this.clinicRepository.findAll(query);
    }
}