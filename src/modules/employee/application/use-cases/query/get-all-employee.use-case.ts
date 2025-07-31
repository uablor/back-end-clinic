import { Inject, Injectable } from "@nestjs/common";
import { Employee } from "src/modules/employee/domain/employee";
import { EmployeeRepository } from "src/modules/employee/domain/employee.repository";
import { PaginationDto } from "src/shared/dto/paginationDto";
import { PaginatedResponse } from "src/shared/interface/pagination-response";

@Injectable()
export class GetAllEmployeeUseCase {
    constructor(
        @Inject('EmployeeRepository')
        private readonly EmployeeRepository: EmployeeRepository
    ) { }
    async execute(query: PaginationDto): Promise<PaginatedResponse<Employee>> {
        return this.EmployeeRepository.findAll(query);
    }
}