import { User } from 'src/modules/user/domain/user';
import { Employee } from 'src/modules/employee/domain/employee';
import { ClinicProps } from '../interface/clinic.interface';
import { Attendance } from 'src/modules/attendance/domain/attendance';

export class Clinic {
  public id?: number;
  public name: string;
  public latitude: number;
  public longitude: number;
  public radius: number;
  public start_time_work: string;
  public end_time_work: string;
  public late_threshold_minutes: number;

  public users: User[];
  public employees: Employee[];
  public attendances: Attendance[];

  public createdAt?: Date;
  public updatedAt?: Date;
  public deletedAt?: Date | null;

  constructor(props: ClinicProps) {
    this.id = props.id;
    this.name = props.name;
    this.latitude = props.latitude;
    this.longitude = props.longitude;
    this.radius = props.radius;
    this.start_time_work = props.start_time_work;
    this.end_time_work = props.end_time_work;
    this.late_threshold_minutes = props.late_threshold_minutes;

    this.users = props.users ?? [];
    this.employees = props.employees ?? [];

    this.attendances = props.attendances ?? [];

    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
    this.deletedAt = props.deletedAt ?? null;
  }

  updateLocation(latitude: number, longitude: number) {
    this.latitude = latitude;
    this.longitude = longitude;
  }

  updateRadius(radius: number) {
    this.radius = radius;
  }

  rename(name: string) {
    this.name = name;
  }

  addUser(user: User) {
    this.users.push(user);
  }

  addEmployee(employee: Employee) {
    this.employees.push(employee);
  }


  addAttendance(attendance: Attendance) {
    this.attendances.push(attendance);
  }
}
