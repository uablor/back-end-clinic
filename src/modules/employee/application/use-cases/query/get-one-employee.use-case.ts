import { Inject, NotFoundException } from "@nestjs/common";
import { Employee } from "src/modules/employee/domain/employee";
import { EmployeeRepository } from "src/modules/employee/domain/employee.repository";

export class GetOneEmployeeUseCase {
    constructor(
        @Inject('EmployeeRepository')
        private readonly EmployeeRepository: EmployeeRepository
    ) {}

    async execute(id: number): Promise<Employee> {
        const Employee = await this.EmployeeRepository.findOne(id);
        if (!Employee) throw new NotFoundException('Employee not found');
        return Employee;
    }
}