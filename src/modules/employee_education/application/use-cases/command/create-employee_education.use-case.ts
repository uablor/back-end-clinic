import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { Employee_educationRepository } from "src/modules/employee_education/domain/employee_education.repository";
import { CreateEducationDto } from "../../dto/create-employee_education.dto";
import { GetOneEmployeeUseCase } from "src/modules/employee/application/use-cases/query/get-one-employee.use-case";
import { EmployeeMapper } from "src/modules/employee/mapper/employee.mapper";
import { EmployeeEducationsEntity } from "src/infrastructure/typeorm/employee_educations.orm-entity";
import { Employee_educationMapper } from "src/modules/employee_education/mapper/employee_education.mapper";

@Injectable()
export class CreateEducationUseCase {
    constructor(
        @Inject('Employee_educationRepository')
        private readonly educationRepository: Employee_educationRepository,
        private readonly getOneEmployeeUseCase: GetOneEmployeeUseCase
    ) { }

    async execute(dto: CreateEducationDto) {
        const Employee = await this.getOneEmployeeUseCase.execute(dto.employee_id)
        if (!Employee) throw new NotFoundException("Employee not found")
        const EmployeeOrm = EmployeeMapper.toOrm(Employee)
        const education = new EmployeeEducationsEntity();
        education.level = dto.level;
        education.field_of_study = dto.field_of_study;
        education.status = dto.status;
        education.employee_id = EmployeeOrm;
        return this.educationRepository.save(Employee_educationMapper.toDomain(education))
    }
}