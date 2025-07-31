export interface PermissionProps {
  id?: number;
  name?: string;
  display_name?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}

export class Permission {
  public id?: number;
  public name?: string;
  public display_name?: string;
  public createdAt?: Date;
  public updatedAt?: Date;
  public deletedAt?: Date | null;

  constructor(props: PermissionProps) {
    this.id = props.id;
    this.name = props.name;
    this.display_name = props.display_name;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
    this.deletedAt = props.deletedAt ?? null;
  }
}