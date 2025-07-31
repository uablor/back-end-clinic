import { AttendanceStatus } from 'src/infrastructure/typeorm/attendance.orm-entity';
import { Clinic } from 'src/modules/clinic/domain/clinic';
import { User } from 'src/modules/user/domain/user';

export interface AttendanceProps {
  id?: number;
  userId: number;
  clinicId: number;
  date: Date;
  check_out_time: string;
  check_in_time: string;
  // latitude: number;
  // longitude: number;
  // accuracy: number;
  status?: AttendanceStatus;
  note: string;
  user?: User;
  clinic?: Clinic;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}

export interface AttendanceResponse {
  id?: number;
  userId: number;
  clinicId: number;
  date: string;
  checkInTime?: string;
  checkOutTime?: string;
  status?: AttendanceStatus;
  note?: string;
  user_username: string;
  user_email: string;
  clinic_name: string;
  createdAt?: string; 
  updatedAt?: string; 
  deletedAt?: string | null; 
}
