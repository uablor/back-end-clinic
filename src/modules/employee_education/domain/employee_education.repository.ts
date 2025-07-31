import { PaginatedResponse } from "src/shared/interface/pagination-response";
import { Employee_education } from "./employee_education";
import { PaginationDto } from "src/shared/dto/paginationDto";

export interface Employee_educationRepository {
    // getAll():Promise<PaginatedResponse<Employee_education>>
    save(educatoin: Employee_education): Promise<Employee_education>
    update(id: number, Employee: Employee_education): Promise<Employee_education>;
    findOne(id: number): Promise<Employee_education | null>;
    // findAll(query: PaginationDto): Promise<PaginatedResponse<Employee_education>>;
    hardDelete(id: number): Promise<{ message: string }>;
    // softDelete(id: number): Promise<{ message: string }>;
    // restore(id: number): Promise<{ message: string }>;
}