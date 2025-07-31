import { PaginationDto } from "src/shared/dto/paginationDto";
import { Employee } from "./employee";
import { PaginatedResponse } from "src/shared/interface/pagination-response";
import { User } from "src/modules/user/domain/user";

export interface EmployeeRepository {
    save(Employee: Employee, user: User): Promise<Employee>;
    update(id: number, Employee: Employee): Promise<Employee>;
    findOne(id: number): Promise<Employee|null>;
    findAll(query: PaginationDto): Promise<PaginatedResponse<Employee>>;
    hardDelete(id: number): Promise<{ message: string }>;
    softDelete(id: number): Promise<{ message: string }>;
    restore(id: number): Promise<{ message: string }>;
}