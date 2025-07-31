import { ClinicEntity } from 'src/infrastructure/typeorm/clinic.orm-entity';
import { Clinic } from '../domain/clinic';
import { formatTimeStamp } from 'src/shared/utils/formatTime.util';
import { IPagination } from 'src/shared/interface/pagination-interface';

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
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      deletedAt: entity.deletedAt
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
      ...formatTimeStamp(domain.createdAt, domain.updatedAt, domain.deletedAt)
    };
  }

  static toResponseList(clinics: Clinic[], pagination: IPagination) {
    return {
    data: clinics.map((clinic) => ({
      ...clinic,
      users: clinic.users ?? [],
      employees: clinic.employees ?? [],
      attendances: clinic.attendances ?? [],
      addEmployee: clinic.addEmployee,
      addUser: clinic.addUser,
      addAttendance: clinic.addAttendance,
      rename: clinic.rename,
      updateRadius: clinic.updateRadius,
      updateLocation: clinic.updateLocation,
    })),
      pagination
    };
  }
}
