import { SharedBaseEntity } from 'src/shared/base/baseEntity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { EmployeeEntity } from './employee.orm-entity';
export enum EducationStatus {
  STUDING = 'studying',
  GRADUATED = 'graduated',
}
@Entity('Employee_educations')
export class EmployeeEducationsEntity extends SharedBaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @ManyToOne(() => EmployeeEntity, (Employee) => Employee.educations, {
    onDelete: 'CASCADE',
  })
  employee_id: EmployeeEntity;
  @Column()
  level: string; // e.g., "Bachelor's", "Master's"
  @Column()
  field_of_study: string; // e.g., "Computer Science", "Business Administration"
  @Column()
  current_occupation: string; // e.g., "Software Engineer", "Data Analyst"
  @Column({ nullable: true })
  work_experience: number;
  @Column({
    type: 'enum',
    enum: EducationStatus,
    default: EducationStatus.GRADUATED,
  })
  status: EducationStatus;
}
