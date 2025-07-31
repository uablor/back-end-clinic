import { Injectable } from "@nestjs/common";
import { Employee_educationRepository } from "../domain/employee_education.repository";
import { Employee_education } from "../domain/employee_education";
import { InjectRepository } from "@nestjs/typeorm";
import { EmployeeEducationsEntity } from "src/infrastructure/typeorm/employee_educations.orm-entity";
import { Repository } from "typeorm";
import { Employee_educationMapper } from "../mapper/employee_education.mapper";

@Injectable()
export class Employee_educationRepositoryOrm implements Employee_educationRepository {
    constructor(
        @InjectRepository(EmployeeEducationsEntity)
        private readonly educationRepository: Repository<EmployeeEducationsEntity>
    ) { }
    async save(education: Employee_education): Promise<Employee_education> {
        const educatioOrm = Employee_educationMapper.toOrm(education)
        const educationCreate = this.educationRepository.create(educatioOrm)
        await this.educationRepository.save(educationCreate)
        return Employee_educationMapper.toDomain(educationCreate)
    }

    async findOne(id: number): Promise<Employee_education | null> {
        const educatioOrm = await this.educationRepository.findOne({ where: { id: id }, relations: ['employee_id', 'employee_id.user'] });
        return educatioOrm ? Employee_educationMapper.toDomain(educatioOrm) : null
    }

    async update(id: number, Employee: Employee_education): Promise<Employee_education> {
        const educatioOrm = Employee_educationMapper.toOrm(Employee)
        await this.educationRepository.update({ id: id }, educatioOrm)
        return Employee
    }

    async hardDelete(id: number): Promise<{ message: string; }> {
        await this.educationRepository.delete({ id: id })
        return { message: 'education deleted' }
    }

}