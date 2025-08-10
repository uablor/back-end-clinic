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
  level: string; 

  @Column()
  field_of_study: string; 

  @Column()
  current_occupation: string;

  @Column({
    type: 'enum',
    enum: EducationStatus,
    default: EducationStatus.GRADUATED,
  })
  status: EducationStatus;
}
