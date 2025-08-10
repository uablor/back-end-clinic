import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { DistrictEntity } from './district.orm-entity';
import { SharedBaseEntity } from 'src/shared/base/baseEntity';

import { UserEntity } from './user.orm-entity';
import { ClinicEntity } from './clinic.orm-entity';
import { EmployeeEducationsEntity } from './employee_educations.orm-entity';

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
}
@Entity('Employees')
export class EmployeeEntity extends SharedBaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  surname: string;

  @Column({ nullable: true })
  birth_date: Date;

  @Column({ nullable: true })
  gender: Gender;

  @OneToOne(() => UserEntity, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn()
  user: UserEntity;

  @ManyToOne(() => DistrictEntity, (district) => district.employee, {
    nullable: true,
  })
  district: DistrictEntity;

  @OneToMany(
    () => EmployeeEducationsEntity,
    (education) => education.employee_id,
  )
  educations: EmployeeEducationsEntity[];

  @ManyToOne(() => ClinicEntity, (clinic) => clinic.employees)
  clinic: ClinicEntity;
}
