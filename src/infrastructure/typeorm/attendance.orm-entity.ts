import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn } from "typeorm";
import { UserEntity } from "./user.orm-entity";
import { ClinicEntity } from "./clinic.orm-entity";
import { SharedBaseEntity } from "src/shared/base/baseEntity";

export enum AttendanceStatus {
  PRESENT = 'present',
  LATE = 'late',
  ABSENT = 'absent',
}

@Entity('attendances')
export class AttendanceEntity extends SharedBaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  date: Date;

  @Column({ type: 'time', nullable: true })
  check_in_time: string;

  @Column({ type: 'time', nullable: true })
  check_out_time: string;

  @Column({ type: 'enum', enum: AttendanceStatus, default: AttendanceStatus.PRESENT })
  status: AttendanceStatus;

  @Column({ type: 'text', nullable: true })
  note: string;


  @Column()
  userId: number;

  @Column()
  clinicId: number;

  @ManyToOne(() => UserEntity, user => user.attendances)
  @JoinColumn({ name: 'userId' })
  user: UserEntity;

  @ManyToOne(() => ClinicEntity, clinic => clinic.attendances)
  @JoinColumn({ name: 'clinicId' }) 
  clinic: ClinicEntity;
}
