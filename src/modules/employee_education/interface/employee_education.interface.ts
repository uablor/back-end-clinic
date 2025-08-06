import { EducationStatus } from "src/infrastructure/typeorm/employee_educations.orm-entity"
import { Employee } from "src/modules/employee/domain/employee"

export interface Employee_educationProps {
    id?: number
    level: string
    field_of_study: string
    current_occupation: string
    work_experience: number
    status: EducationStatus
    employee_id : Employee | null
    createdAt?: Date
    updatedAt?: Date
    deletedAt?: Date | null

}