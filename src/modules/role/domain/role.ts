import { Permission } from "src/modules/permission/domain/permission";
import { RoleProps } from "../interface/role.interface";



export class Role implements RoleProps {
  public id?: number;
  public name: string;
  public display_name: string;
  public permissions: Permission[]
  public createdAt?: Date;
  public updatedAt?: Date;
  public deletedAt?: Date | null;
  constructor(props: RoleProps) {
    this.id = props.id;
    this.name = props.name ?? '';
    this.display_name = props.display_name ?? '';
    this.permissions = props.permissions ?? [];
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
    this.deletedAt = props.deletedAt ?? null;
  }
}