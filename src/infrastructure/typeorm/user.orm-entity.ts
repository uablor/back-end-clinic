// user.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, ManyToMany, JoinTable, JoinColumn, OneToOne } from 'typeorm';
import { RoleEntity } from './role.orm-entity';
import { PermissionsEntity } from './permissions.orm-entity';
import { ClinicEntity } from './clinic.orm-entity';
import { AttendanceEntity } from './attendance.orm-entity';
import { EmployeeEntity } from './employee.orm-entity';
import { SharedBaseEntity } from 'src/shared/base/baseEntity';

@Entity('users')
export class UserEntity extends SharedBaseEntity {
  @PrimaryGeneratedColumn()

  id: number;

  @Column({ length: 100 })
  username: string;

  @Column({ length: 100, unique: true })
  email: string;

  @Column({ length: 255, nullable: true })
  password: string;

  @Column({ length: 100, nullable: true })
  avatar: string;

  @Column({ type: 'int', nullable: true })
  clinic_id: number;

  @Column({ default: false })
  is_verified: boolean;

  @ManyToOne(() => ClinicEntity, clinic => clinic.users)
  @JoinColumn({ name: 'clinic_id' })
  clinic: ClinicEntity;

  @OneToMany(() => AttendanceEntity, attendance => attendance.user)
  attendances: AttendanceEntity[];

  @ManyToMany(() => RoleEntity, role => role.users)
  @JoinTable({ name: 'user_roles' })
  roles: RoleEntity[];

  @ManyToMany(() => PermissionsEntity, permission => permission.users)
  @JoinTable({ name: 'user_permissions' })
  permissions: PermissionsEntity[];

  @OneToOne(() => EmployeeEntity, (employee) => employee.user )
  employee: EmployeeEntity
}
