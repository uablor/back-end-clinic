import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { Employee_educationRepository } from "src/modules/employee_education/domain/employee_education.repository";
import { UpdateEducationDto } from "../../dto/update-employee_education.dto";
import { EmployeeEducationsEntity } from "src/infrastructure/typeorm/employee_educations.orm-entity";
import { EmployeeMapper } from "src/modules/employee/mapper/employee.mapper";
import { Employee_educationMapper } from "src/modules/employee_education/mapper/employee_education.mapper";

@Injectable()
export class UpdateEducationUseCase {
    constructor(@Inject('Employee_educationRepository') private readonly educationRepository: Employee_educationRepository) { }
    async execute(id: number, dto: UpdateEducationDto) {
        const educationExists = await this.educationRepository.findOne(id);
        if (!educationExists) throw new NotFoundException("Education not found")
        if (!educationExists.employee_id) throw new NotFoundException('employee not found');
        const education = new EmployeeEducationsEntity();
        education.level = dto.level || educationExists.level;
        education.field_of_study = dto.field_of_study || educationExists.field_of_study;
        education.status = dto.status || educationExists.status;
        education.employee_id = EmployeeMapper.toOrm(educationExists.employee_id);
        return this.educationRepository.update(id, Employee_educationMapper.toDomain(education))
    }
}