import { SharedBaseEntity } from "src/shared/base/baseEntity";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "./user.orm-entity";
import { RoleEntity } from "./role.orm-entity";

@Entity('permissions')
export class PermissionsEntity extends SharedBaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({ unique: true })
    name: string;
    @Column({ unique: true })
    display_name: string
    @ManyToMany(() => UserEntity, user => user.permissions)
    users: UserEntity[];
    @ManyToMany(() => RoleEntity, role => role.permissions)
    roles: RoleEntity[];
}