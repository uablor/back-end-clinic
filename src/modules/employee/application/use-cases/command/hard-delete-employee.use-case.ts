import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { EmployeeRepository } from "src/modules/employee/domain/employee.repository";

@Injectable()
export class HardDeleteEmployeeUseCase {
    constructor(
        @Inject('EmployeeRepository') private readonly EmployeeRepository: EmployeeRepository
    ){}

    async execute(id: number){
        return await this.EmployeeRepository.hardDelete(id);
    }
}