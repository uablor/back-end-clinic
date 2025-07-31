import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { AttendanceRepository } from "src/modules/attendance/domain/attendance.repository";

@Injectable()
export class HardDeleteAttendanceUseCase {
    constructor(
            @Inject('AttendanceRepository')
            private readonly attendanceRepository: AttendanceRepository,
        
    ){}

    async execute(id: number){
        return await this.attendanceRepository.hardDelete(id);
    }
}