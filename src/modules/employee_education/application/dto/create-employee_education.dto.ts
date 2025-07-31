import { IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { EducationStatus } from "src/infrastructure/typeorm/employee_educations.orm-entity";

export class CreateEducationDto {
    @IsString()
    @IsNotEmpty()
    level: string

    @IsString()
    @IsNotEmpty()
    field_of_study: string

    @IsString()
    @IsNotEmpty()
    current_occupation: string

    @IsNumber()
    @IsNotEmpty()
    work_experience: number

    @IsEnum(EducationStatus)
    @IsNotEmpty()
    status: EducationStatus

    @IsNumber()
    @IsNotEmpty()
    employee_id: number
}