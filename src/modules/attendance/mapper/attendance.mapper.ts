
import { Attendance } from '../domain/attendance';
import { IPagination } from 'src/shared/interface/pagination-interface';
import { formatTimeStamp, formatTimeUtil } from 'src/shared/utils/formatTime.util';
import { UserMapper } from 'src/modules/user/mapper/user.mapper';
import { ClinicMapper } from 'src/modules/clinic/mapper/clinic.mapper';
import { AttendanceEntity } from 'src/infrastructure/typeorm/attendance.orm-entity';

export class AttendanceMapper {
  static toDomain(entity: AttendanceEntity): Attendance {
    return new Attendance({
      id: entity.id,
      userId: entity.userId,
      clinicId: entity.clinicId,
      date: entity.date,
      check_in_time: entity.check_in_time ?? undefined,
      check_out_time: entity.check_out_time ?? undefined,
      status: entity.status,
      note: entity.note ?? undefined,
      user: entity.user ? UserMapper.toDomain(entity.user) : undefined,
      clinic: entity.clinic ? ClinicMapper.toDomain(entity.clinic) : undefined,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      deletedAt: entity.deletedAt ?? null,
    });
  }

  static toOrm(domain: Attendance): AttendanceEntity {
    const entity = new AttendanceEntity();
    if (domain.id !== undefined) entity.id = domain.id;
    entity.userId = domain.userId;
    entity.clinicId = domain.clinicId;
    entity.date = domain.date;
    entity.check_in_time = domain.check_in_time;
    entity.check_out_time = domain.check_out_time;
    entity.status = domain.status;
    entity.note = domain.note;

    // Optional: assign relations if needed
    if (domain.user) entity.user = UserMapper.toOrm(domain.user);
    if (domain.clinic) entity.clinic = ClinicMapper.toOrm(domain.clinic);

    return entity;
  }

  static toResponse(domain: Attendance) {
    return {
      id: domain.id,
      userId: domain.userId,
      clinicId: domain.clinicId,
      date: formatTimeUtil(domain.date),
      check_in_time: domain.check_in_time ?? null,
      check_out_time: domain.check_out_time ?? null,
      status: domain.status,
      note: domain.note ?? null,
      user_username: domain.user?.username ?? "",
      user_email: domain.user?.email ?? "",
      clinic_name: domain.clinic?.name ?? "",
      
      ...formatTimeStamp(domain.createdAt, domain.updatedAt, domain.deletedAt),
    };
  }

  static toResponseList(attendances: Attendance[], pagination: IPagination) {
    return {
      data: attendances.map(a => this.toResponse(a)),
      pagination,
    };
  }
}
