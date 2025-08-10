import { EducationStatus } from "src/infrastructure/typeorm/employee_educations.orm-entity"
import { Employee_educationProps } from "../interface/employee_education.interface"
import { Employee } from "src/modules/employee/domain/employee"

export class Employee_education {
    public id?: number
    public level: string
    public field_of_study: string
    public current_occupation: string
    public status: EducationStatus
    public createdAt?: Date
    public updatedAt?: Date
    public deletedAt?: Date | null
    public employee_id: Employee | null
    constructor(
        props: Employee_educationProps
    ) {
        this.id = props.id;
        this.level = props.level
        this.status = props.status
        this.current_occupation = props.current_occupation
        this.field_of_study = props.field_of_study
        this.employee_id = props.employee_id
    }
}