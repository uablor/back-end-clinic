import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { EmployeeRepository } from "src/modules/employee/domain/employee.repository";

@Injectable()
export class SoftDeleteEmployeeUseCase {
    constructor(
        @Inject('EmployeeRepository') private readonly EmployeeRepository: EmployeeRepository
    ){}

    async execute(id: number){
        const Employee = await this.EmployeeRepository.findOne(id);
        if (!Employee) throw new NotFoundException('Employee not found');
        return await this.EmployeeRepository.softDelete(id);
    }
}