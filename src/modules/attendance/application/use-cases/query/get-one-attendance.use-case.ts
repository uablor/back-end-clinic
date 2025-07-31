import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Attendance } from 'src/modules/attendance/domain/attendance';
import { AttendanceRepository } from 'src/modules/attendance/domain/attendance.repository';
import { User } from 'src/modules/user/domain/user';
import { UserRepository } from 'src/modules/user/domain/user.repository';

@Injectable()
export class GetOneAttendanceUseCase {
  constructor(
    @Inject('AttendanceRepository')
    private readonly attendanceRepository: AttendanceRepository,
  ) {}

  async execute(id: number): Promise<Attendance> {
    const attendance = await this.attendanceRepository.findOne(id);
    if (!attendance) throw new NotFoundException('attendance not found');
    return attendance;
  }
}
