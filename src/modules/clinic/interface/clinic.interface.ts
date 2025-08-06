import { User } from 'src/modules/user/domain/user';
import { Employee } from 'src/modules/employee/domain/employee';
import { Attendance } from 'src/modules/attendance/domain/attendance';
import { District } from 'src/modules/district/domain/district';

export interface ClinicProps {
  id?: number;
  name: string;
  latitude: number;
  longitude: number;
  radius: number;
  start_time_work: string;
  end_time_work: string;
  late_threshold_minutes: number;
  district?: District | null;
  users?: User[] | null;
  employees?: Employee[] | null;
  attendances?: Attendance[] | null;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}

export interface ClinicResponse {
  id?: number;
  name: string;
  latitude: number;
  longitude: number;
  radius: number;
  start_time_work: string;
  end_time_work: string;
  late_threshold_minutes: number;
  district_id: number | null;
  district: string | null;
  distinct_en: string | null;
  province_id: number | null;
  province: string | null;
  province_en: string | null;
  users?: User[];
  employees?: Employee[];
  attendances?: Attendance[];

  usercount?: number;
  employeeCount?: number;
  attendanceCount?: number;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string | null;
}
