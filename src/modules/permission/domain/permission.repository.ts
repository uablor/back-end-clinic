import { Permission } from "./permission";

export interface PermissionRepository {
    getAllPermission(): Promise<Permission[]>;
}