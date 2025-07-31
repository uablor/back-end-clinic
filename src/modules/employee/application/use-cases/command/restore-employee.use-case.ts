import { Inject, Injectable } from "@nestjs/common";
import { EmployeeRepository } from "src/modules/employee/domain/employee.repository";

@Injectable()
export class RestoreEmployeeUseCase {
    constructor(
        @Inject('EmployeeRepository') private readonly EmployeeRepository: EmployeeRepository
    ){}

    async execute(id: number){
        return await this.EmployeeRepository.restore(id);
    }
}