import { PaginationDto } from "src/shared/dto/paginationDto";
import { Role } from "./role";
import { PaginatedResponse } from "src/shared/interface/pagination-response";

export interface RoleRepository {
    save(role: Role): Promise<Role>
    update(id: number, role: Role): Promise<Role>;
    findOne(id: number): Promise<Role | null>;
    findAll(query: PaginationDto): Promise<PaginatedResponse<Role>>;
    hardDelete(id: number): Promise<{ message: string }>;
    softDelete(id: number): Promise<{ message: string }>;
    restore(id: number): Promise<{ message: string }>;
}