import { Inject, Injectable } from "@nestjs/common";
import { Attendance } from "src/modules/attendance/domain/attendance";
import { AttendanceRepository } from "src/modules/attendance/domain/attendance.repository";
import { PaginationDto } from "src/shared/dto/paginationDto";
import { PaginatedResponse } from "src/shared/interface/pagination-response";

@Injectable()
export class GetAllAttendanceUseCase {
    constructor(
            @Inject('AttendanceRepository')
            private readonly attendanceRepository: AttendanceRepository,
        
    ){}
    async execute(query: PaginationDto): Promise<PaginatedResponse<Attendance>> {
        return this.attendanceRepository.findAll(query);
    }
}