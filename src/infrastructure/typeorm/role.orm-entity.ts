import { SharedBaseEntity } from "src/shared/base/baseEntity";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "./user.orm-entity";
import { PermissionsEntity } from "./permissions.orm-entity";

@Entity('roles')
export class RoleEntity extends SharedBaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({ unique: true })
    name: string;
    @Column({ unique: true })
    display_name: string
    @ManyToMany(() => UserEntity, user => user.roles)
    users: UserEntity[];
    @ManyToMany(() => PermissionsEntity, permission => permission.roles)
    @JoinTable({ name: 'role_permissions' })
    permissions: PermissionsEntity[];
}