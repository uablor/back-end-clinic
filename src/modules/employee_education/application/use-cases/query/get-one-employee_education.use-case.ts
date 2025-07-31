import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { Employee_educationRepository } from "src/modules/employee_education/domain/employee_education.repository";

@Injectable()
export class GetOneEducationUseCase {
    constructor(
        @Inject('Employee_educationRepository')
        private readonly educationRepository: Employee_educationRepository,
    ) { }

    async execute(id: number) {
        const education = await this.educationRepository.findOne(id);
        if (!education) throw new NotFoundException('education not found');
        return education;
    }
}