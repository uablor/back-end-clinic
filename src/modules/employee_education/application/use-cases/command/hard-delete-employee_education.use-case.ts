import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { Employee_educationRepository } from "src/modules/employee_education/domain/employee_education.repository";

@Injectable()
export class HardDeleteEducationUseCase {
    constructor(@Inject('Employee_educationRepository') private readonly educationRepository: Employee_educationRepository) { }
    execute(id: number) {
        const educationExists = this.educationRepository.findOne(id);
        if (!educationExists) throw new NotFoundException('education not found');
        return this.educationRepository.hardDelete(id);
    }
}