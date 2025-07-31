import { Inject, Injectable } from "@nestjs/common";
import { AttendanceRepository } from "src/modules/attendance/domain/attendance.repository";
import { EmployeeRepository } from "src/modules/employee/domain/employee.repository";

@Injectable()
export class RestoreAttendanceUseCase {
    constructor(
            @Inject('AttendanceRepository')
                    private readonly attendanceRepository: AttendanceRepository,
                
    ){}

    async execute(id: number){
        return await this.attendanceRepository.restore(id);
    }
}