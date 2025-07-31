import {
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { AttendanceRepository } from 'src/modules/attendance/domain/attendance.repository';
import { Attendance } from 'src/modules/attendance/domain/attendance';
import { UserRepository } from 'src/modules/user/domain/user.repository';
import { ClinicRepository } from 'src/modules/clinic/domain/clinic.repository';
import * as dayjs from 'dayjs';
import { UpdateAttendanceDto } from '../../dto/update-attendance.dto';

@Injectable()
export class UpdateAttendanceUseCase {
  constructor(
    @Inject('AttendanceRepository')
    private readonly attendanceRepository: AttendanceRepository,

    @Inject('UserRepository')
    private readonly userRepository: UserRepository,

    @Inject('ClinicRepository')
    private readonly clinicRepository: ClinicRepository,
  ) {}

  async execute(id: number, userId: number, dto: UpdateAttendanceDto): Promise<Attendance> {

    const user = await this.userRepository.findOne(userId);

    if (!user) throw new NotFoundException('User not found');
    if (!user?.clinic?.id) throw new NotFoundException('Clinic not found');

    const clinic = await this.clinicRepository.findOne(user.clinic.id);
    if (!clinic) throw new NotFoundException('Clinic not found');

    const now = dayjs();
    const startOfDay = now.startOf('day').toDate();
    const endOfDay = now.endOf('day').toDate();

    const attendance = await this.attendanceRepository.findByDateRangeAndUserId(
      'id',
      id,
      startOfDay,
      endOfDay,
    );

    if (!attendance) {
      throw new NotFoundException('No attendance found to update today.');
    }

    if (attendance.check_out_time && attendance.check_out_time !== '00:00:00') {
      throw new ForbiddenException('You have already checked out.');
    }

    const endTimeParts = clinic.end_time_work.split(':').map(Number);
    const endTime = now
      .set('hour', endTimeParts[0])
      .set('minute', endTimeParts[1])
      .set('second', 0)
      .set('millisecond', 0);

    if (now.isBefore(endTime)) {
      throw new ForbiddenException('Cannot check out before end of work time.');
    }

    const attendanceUpdate = new Attendance({
      date: attendance.date,
      clinicId: user.clinic.id,
      userId: userId,
      status: dto.status ?? attendance.status,
      note: dto.note ?? attendance.note,
      check_in_time: dto.check_in_time ?? attendance.check_in_time,
      check_out_time: now.format('HH:mm:ss'),
    });

    return await this.attendanceRepository.update(id, attendanceUpdate);
  }
}
