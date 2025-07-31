import { PaginatedResponse } from "src/shared/interface/pagination-response";
import { User } from "./user";
import { PaginationDto } from "src/shared/dto/paginationDto";

export interface UserRepository {
    findByEmail(email: string): Promise<User|null>;
    save(user: User): Promise<User>;
    update(id: number,user: User): Promise<User>;
    findOne(id: number): Promise<User|null>;
    findAll(query: PaginationDto): Promise<PaginatedResponse<User>>;
    hardDelete(id: number): Promise<{ message: string }>;
    softDelete(id: number): Promise<{ message: string }>;
    restore(id: number): Promise<{ message: string }>;
}