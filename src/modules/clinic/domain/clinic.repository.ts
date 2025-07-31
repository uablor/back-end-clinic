import { PaginatedResponse } from "src/shared/interface/pagination-response";
import { PaginationDto } from "src/shared/dto/paginationDto";
import { Clinic } from "./clinic";

export interface ClinicRepository {
    save(Clinic: Clinic): Promise<Clinic>;
    update(id: number,user: Clinic): Promise<Clinic>;
    findOne(id: number): Promise<Clinic|null>;
    findAll(query: PaginationDto): Promise<PaginatedResponse<Clinic>>;
    hardDelete(id: number): Promise<{ message: string }>;
    softDelete(id: number): Promise<{ message: string }>;
    restore(id: number): Promise<{ message: string }>;
}