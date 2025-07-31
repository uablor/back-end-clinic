import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { AttendanceRepository } from 'src/modules/attendance/domain/attendance.repository';

@Injectable()
export class SoftDeleteAttendanceUseCase {
  constructor(
    @Inject('AttendanceRepository')
    private readonly attendanceRepository: AttendanceRepository,
  ) {}

  async execute(id: number) {
    const attendance = await this.attendanceRepository.findOne(id);
    if (!attendance) throw new NotFoundException('Employee not found');
    return await this.attendanceRepository.softDelete(id);
  }
}
