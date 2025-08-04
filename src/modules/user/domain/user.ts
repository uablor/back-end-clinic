import { Role } from "src/modules/role/domain/role";
import { Permission } from 'src/modules/permission/domain/permission';
import { UserProps } from "../interface/user.interface";
import { hashPassword } from "src/shared/utils/bcrypt.util";
import { Clinic } from "src/modules/clinic/domain/clinic";



export class User implements UserProps {
  public id?: number;
  public username: string;
  public email: string;
  public password: string;
  public is_verified: boolean;
  public avatar?: string;
  public clinic?: Clinic;
  public roles: Role[];
  public permissions: Permission[];
  public createdAt?: Date;
  public updatedAt?: Date;
  public deletedAt?: Date | null;

  constructor(props: UserProps) {
    this.id = props.id;
    this.username = props.username;
    this.email = props.email;
    this.password = props.password;
    this.avatar = props.avatar;
    this.is_verified = props.is_verified ?? false;
    this.clinic = props.clinic ?? undefined;
    this.roles = props.roles ?? [];
    this.permissions = props.permissions ?? [];
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
    this.deletedAt = props.deletedAt ?? null;
  }
  async changePassword(password: string) {
    this.password = await hashPassword(password);
  }
  verify() {
    this.is_verified = true;
  }

  addRole(role: Role[]) {
    this.roles.push(...role);
  }

  addPermission(permission: Permission[]) {
    this.permissions.push(...permission);
  }
}