import { Module } from "@nestjs/common";
import { EmployeeModule } from "../employee/employee.module";
import { EmployeeEducationController } from "./controller/employee_education.controller";
import { CreateEducationUseCase } from "./application/use-cases/command/create-employee_education.use-case";
import { Employee_educationRepositoryOrm } from "./infrastructure/employee_education.repository.orm";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EmployeeEducationsEntity } from "src/infrastructure/typeorm/employee_educations.orm-entity";
import { GetOneEducationUseCase } from "./application/use-cases/query/get-one-employee_education.use-case";
import { UpdateEducationUseCase } from "./application/use-cases/command/update-employee_education.use-case";
import { HardDeleteEducationUseCase } from "./application/use-cases/command/hard-delete-employee_education.use-case";

@Module({
    imports: [EmployeeModule,TypeOrmModule.forFeature([
        EmployeeEducationsEntity
    ])],
    controllers: [EmployeeEducationController],
    providers: [
        {
            provide:'Employee_educationRepository',
            useClass:Employee_educationRepositoryOrm
        },
        CreateEducationUseCase,
        GetOneEducationUseCase,
        UpdateEducationUseCase,
        HardDeleteEducationUseCase
    ],
    exports: []
})
export class EmployeeEducationModule {}