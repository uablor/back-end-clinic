import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { ClinicRepository } from "src/modules/clinic/domain/clinic.repository";
import { EmployeeRepository } from "src/modules/employee/domain/employee.repository";

@Injectable()
export class SoftDeleteClinicUseCase {
    constructor(
        @Inject('ClinicRepository') private readonly clinicRepository: ClinicRepository
    ) { }

    async execute(id: number){
        return await this.clinicRepository.softDelete(id);
    }
}