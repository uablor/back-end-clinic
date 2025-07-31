import {
  Column,
  CreateDateColumn,
  Double,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from './user.orm-entity';
import { EmployeeEntity } from './employee.orm-entity';
import { AttendanceEntity } from './attendance.orm-entity';
import { SharedBaseEntity } from 'src/shared/base/baseEntity';

@Entity('clinics')
export class ClinicEntity extends SharedBaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('double', { precision: 15, scale: 10 })
  latitude: number;

  @Column('double', { precision: 15, scale: 10 })
  longitude: number;

  @Column('double precision')
  radius: number;

  @OneToMany(() => UserEntity, (user) => user.clinic)
  users: UserEntity[];

  @OneToMany(() => EmployeeEntity, (emp) => emp.clinic)
  Employees: EmployeeEntity[];

  @Column({ type: 'time' })
  start_time_work: string;

  @Column({ type: 'time' })
  end_time_work: string;

  @Column({ default: 15 })
  late_threshold_minutes: number;

  @OneToMany(() => AttendanceEntity, (attendance) => attendance.clinic)
  attendances: AttendanceEntity[];
}
