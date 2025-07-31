import { PaginationDto } from "src/shared/dto/paginationDto";

import { PaginatedResponse } from "src/shared/interface/pagination-response";
import { User } from "src/modules/user/domain/user";
import { Attendance } from './attendance';

export interface AttendanceRepository {
    save(Attendance: Attendance, userId: number): Promise<Attendance>;
    update(id: number, Attendance: Attendance): Promise<Attendance>;
    findOne(id: number): Promise<Attendance|null>;
    findAll(query: PaginationDto): Promise<PaginatedResponse<Attendance>>;
    hardDelete(id: number): Promise<{ message: string }>;
    softDelete(id: number): Promise<{ message: string }>;
    restore(id: number): Promise<{ message: string }>;
    findByDateRangeAndUserId(type: string,id: number, start: Date, end: Date): Promise<Attendance | null>;
}