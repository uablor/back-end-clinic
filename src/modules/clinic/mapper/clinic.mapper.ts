import { ClinicEntity } from 'src/infrastructure/typeorm/clinic.orm-entity';
import { Clinic } from '../domain/clinic';
import { formatTimeStamp } from 'src/shared/utils/formatTime.util';
import { IPagination } from 'src/shared/interface/pagination-interface';
import e from 'express';
import { UserMapper } from 'src/modules/user/mapper/user.mapper';
import { EmployeeMapper } from 'src/modules/employee/mapper/employee.mapper';
import { AttendanceMapper } from 'src/modules/attendance/mapper/attendance.mapper';
import { DistrictMapper } from 'src/modules/district/mapper/district.mapper';
import { Employee } from 'src/modules/employee/domain/employee';
import { User } from 'src/modules/user/domain/user';
import { Attendance } from 'src/modules/attendance/domain/attendance';

export class ClinicMapper {
  static toDomain(entity: ClinicEntity): Clinic {
    return new Clinic({
      id: entity.id,
      name: entity.name,
      latitude: entity.latitude,
      longitude: entity.longitude,
      radius: entity.radius,
      start_time_work: entity.start_time_work,
      end_time_work: entity.end_time_work,
      late_threshold_minutes: entity.late_threshold_minutes,
      district: entity.district
        ? DistrictMapper.toDomain(entity.district)
        : null,
      users: entity.users?.filter(user => user && user.id).map(user => UserMapper.toDomain(user)) ??  entity.users?.filter(user => user && user.id).map(user => UserMapper.toDomain(user)) ?? [],
      employees: entity.employees?.filter(employee => employee && employee.id).map(employee => EmployeeMapper.toDomain(employee)) ?? [],
      attendances: entity.attendances?.filter(attendance => attendance && attendance.id).map(attendance => AttendanceMapper.toDomain(attendance)) ?? [],
      
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      deletedAt: entity.deletedAt,
    });
  }

  static toOrm(domain: Clinic): ClinicEntity {
    const entity = new ClinicEntity();
    if (domain.id !== undefined) entity.id = domain.id;
    entity.name = domain.name;
    entity.latitude = domain.latitude;
    entity.longitude = domain.longitude;
    entity.radius = domain.radius;
    entity.start_time_work = domain.start_time_work;
    entity.end_time_work = domain.end_time_work;
    entity.late_threshold_minutes = domain.late_threshold_minutes;
    if (domain.district)
      entity.district = DistrictMapper.toOrm(domain.district!);

    return entity;
  }

  static toResponse(domain: Clinic) {
    return {
      id: domain.id,
      name: domain.name,
      latitude: domain.latitude,
      longitude: domain.longitude,

      radius: domain.radius,
      start_time_work: domain.start_time_work,
      end_time_work: domain.end_time_work,
      late_threshold_minutes: domain.late_threshold_minutes,
      // employees: domain.employees,
      // users: domain.users,
      // attendances: domain.attendances,
      district_id: domain.district ? domain.district.id : null,
      district: domain.district ? domain.district.name : null,
      distinct_en: domain.district ? domain.district.name_en : null,
      province_id: domain.district ? domain.district.province.id : null,
      province: domain.district ? domain.district.province.name : null,
      province_en: domain.district ? domain.district.province.name_en : null,
      employeeCount: domain.employees.length,
      userCount: domain.users.length,
      attendanceCount: domain.attendances.length,
      ...formatTimeStamp(domain.createdAt, domain.updatedAt, domain.deletedAt),
    };
  }

  static toResponseList(clinics: Clinic[], pagination: IPagination) {
    return {
      data: clinics.map((clinic) => this.toResponse(clinic)),
      pagination,
    };
  }
}
