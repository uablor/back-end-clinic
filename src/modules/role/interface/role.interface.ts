import { Permission } from "src/modules/permission/domain/permission";

export interface RoleProps {
  id?: number;
  name?: string;
  display_name?: string;
  permissions?:Permission[]
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}

export interface ResponceRole{
  id: number;
  name: string;
  display_name: string;
  permissions: {
    id?: number;
    name: string;
    display_name: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null
  }[];
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

