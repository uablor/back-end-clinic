import { SharedBaseEntity } from "src/shared/base/baseEntity";
import { EmployeeEntity } from "./employee.orm-entity";
import { ProvinceEntity } from "./province.orm-entity";
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from "typeorm";
@Entity('district')
export class DistrictEntity extends SharedBaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;
    @Column()
    name_en: string;
    @ManyToOne(() => ProvinceEntity, (province) => province.districts)
    province: ProvinceEntity
    @OneToMany(() => EmployeeEntity, (Employee) => Employee.district)
    Employee: EmployeeEntity[]
}
