import { User } from 'src/modules/user/domain/user';
import { Employee } from 'src/modules/employee/domain/employee';
import { Attendance } from 'src/modules/attendance/domain/attendance';

  export interface ClinicProps {
  id?: number;
  name: string;
  latitude: number;
  longitude: number;
  radius: number;
  start_time_work: string;
  end_time_work: string;
  late_threshold_minutes: number;
  users?: User[];
  employees?: Employee[];
  attendances?: Attendance[];
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
    users?: User[];
    employees?: Employee[];
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date | null;
  }