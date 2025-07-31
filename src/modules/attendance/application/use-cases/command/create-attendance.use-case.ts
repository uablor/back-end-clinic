import {
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { AttendanceRepository } from 'src/modules/attendance/domain/attendance.repository';
import { Attendance } from 'src/modules/attendance/domain/attendance';
import { CreateAttendanceDto } from '../../dto/create-attendance.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/infrastructure/typeorm/user.orm-entity';
import { Repository, Between } from 'typeorm';
import { ClinicEntity } from 'src/infrastructure/typeorm/clinic.orm-entity';
import { AttendanceStatus } from 'src/infrastructure/typeorm/attendance.orm-entity';
import { haversineDistance } from 'src/shared/utils/haversine';
import { ClinicRepository } from 'src/modules/clinic/domain/clinic.repository';
import { UserRepository } from 'src/modules/user/domain/user.repository';
import * as dayjs from 'dayjs';

@Injectable()
export class CreateAttendanceUseCase {
  constructor(
    @Inject('AttendanceRepository')
    private readonly attendanceRepository: AttendanceRepository,

    @Inject('ClinicRepository')
    private readonly clinicRepository: ClinicRepository,

    @Inject('UserRepository')
    private readonly userRepository: UserRepository,
  ) {}

  async execute(dto: CreateAttendanceDto, userId: number): Promise<Attendance> {
    const user = await this.userRepository.findOne(userId);
    if (!user) throw new NotFoundException('User not found');
    if (!user?.clinic?.id) throw new NotFoundException('Clinic not found');

    const clinic = await this.clinicRepository.findOne(user.clinic.id);
    if (!clinic) throw new NotFoundException('Clinic not found');

    const now = dayjs();

    const startOfDay = now.startOf('day').toDate();
    const endOfDay = now.endOf('day').toDate();

    const existingAttendance = await this.attendanceRepository.findByDateRangeAndUserId(
        'user_id',
        userId,
        startOfDay,
        endOfDay,
      );

    if (existingAttendance) {
      throw new ForbiddenException('You have already checked in today.');
    }

    const { latitude: userLat, longitude: userLng } = dto;
    const { latitude: companyLat, longitude: companyLng, radius } = clinic;

    const distance = haversineDistance(
      companyLat,
      companyLng,
      userLat,
      userLng,
    );
    const isInside = distance <= radius;

    if (!isInside) {
      throw new ForbiddenException('You are outside the clinic zone');
    }

    const [startHour, startMinute] = clinic.start_time_work
      .split(':')
      .map(Number);
    const startTime = now
      .set('hour', startHour)
      .set('minute', startMinute)
      .set('second', 0)
      .set('millisecond', 0);
    const lateThresholdTime = startTime.add(
      clinic.late_threshold_minutes,
      'minute',
    );

    let status = AttendanceStatus.PRESENT;
    if (now.isAfter(lateThresholdTime)) {
      status = AttendanceStatus.LATE;
    }

    const attendance = new Attendance({
      date: now.toDate(),
      check_in_time: now.format('HH:mm:ss'),
      check_out_time: '',
      status,
      note: '',
      clinicId: user.clinic.id,
      userId: userId,
    });

    return await this.attendanceRepository.save(attendance, userId);
  }
}
