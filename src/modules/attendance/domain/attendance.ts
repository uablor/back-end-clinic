 // Optional: Extract enum to shared interface
import { User } from 'src/modules/user/domain/user';
import { Clinic } from 'src/modules/clinic/domain/clinic';
import { AttendanceStatus } from 'src/infrastructure/typeorm/attendance.orm-entity';
import { AttendanceProps } from '../interface/attendance.interface';

export class Attendance {
  public id?: number;
  public userId: number;
  public clinicId: number;
  public date: Date;
  public check_in_time: string;
  public check_out_time: string;
  public status: AttendanceStatus;
  public note: string;

  // public latitude: number;
  // public longitude: number;
  // public accuracy: number;

  public user?: User;
  public clinic?: Clinic;

  public createdAt?: Date;
  public updatedAt?: Date;
  public deletedAt?: Date | null;

  constructor(props: AttendanceProps ) {
    this.id = props.id;
    this.userId = props.userId;
    this.clinicId = props.clinicId;
    this.date = props.date;
    this.check_in_time = props.check_in_time;
    this.check_out_time = props.check_out_time;
    this.status = props.status ?? AttendanceStatus.PRESENT;
    this.note = props.note;

    // this.latitude = props.latitude;
    // this.longitude = props.longitude;
    // this.accuracy = props.accuracy;

    this.user = props.user;
    this.clinic = props.clinic;

    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
    this.deletedAt = props.deletedAt ?? null;
  }

  checkIn(time: string) {
    this.check_in_time = time;
    this.status = AttendanceStatus.PRESENT;
  }

  checkOut(time: string) {
    this.check_out_time = time;
  }

  markAbsent(note?: string) {
    this.status = AttendanceStatus.ABSENT;
    this.note = note ?? this.note;
  }

  markLate(note?: string) {
    this.status = AttendanceStatus.LATE;
    this.note = note ?? this.note;
  }
}
