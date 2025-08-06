// src/common/guards/permissions.guard.ts
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PERMISSIONS_KEY } from '../decorators/permissions.decorator';
import { Request } from 'express';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredPermissions = this.reflector.getAllAndOverride<string[]>(
      PERMISSIONS_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredPermissions) {
      return true;
    }

    const request = context.switchToHttp().getRequest<Request>();
    const user = request.user as any;
    if (!user || !user.permissions) {
      throw new ForbiddenException('No permissions found.');
    }   

    const userPermissions = user.permissions;

    const hasPermission = requiredPermissions.every((permission) =>
      userPermissions.includes(permission),
    );

    if (!hasPermission) {
      throw new ForbiddenException('You do not have the required permissions.');
    }

    return true;
  }
}


@Injectable()
export class AutoPermissionsGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const isAuto = this.reflector.getAllAndOverride<boolean>(
      'autoPermissions',
      [context.getHandler(), context.getClass()],
    );
    if (!isAuto) return true;

    const request = context.switchToHttp().getRequest();
    const { method, user, route } = request;

    if (!user || !user.permissions) return false;
    if (user.isSuperAdmin) return true;

    // ชื่อ controller → 'UserController' → 'user'
    const controllerName = context.getClass().name.replace('Controller', '').toLowerCase(); // ex. 'user'
    const handlerName = context.getHandler().name; // เช่น 'getOne', 'create', 'update'

    // Map HTTP Method → action prefix
    const methodMap: Record<string, string> = {
      GET: 'get',
      POST: 'create',
      PUT: 'update',
      PATCH: 'update',
      DELETE: 'soft_delete', // หรือ 'delete' ตามที่คุณใช้
    };

    let action = methodMap[method];

    // กรณีใช้เมธอดที่ไม่ได้ map เช่น 'restore', 'hard_delete' ให้ map เพิ่มเอง
    const extraMethodMapping: Record<string, string> = {
      restore: 'restore',
      hardDelete: 'hard_delete',
      getEmail: 'get_email',
      getOne: 'get_one',
      getAll: 'get_all',
    };

    // ถ้ามีชื่อเมธอดพิเศษ ให้ใช้ override
    for (const key in extraMethodMapping) {
      if (handlerName.toLowerCase().includes(key.toLowerCase())) {
        action = extraMethodMapping[key];
      }
    }

    const permissionName = `${action}_${controllerName}`; // เช่น 'get_one_user', 'update_user'
    console.log(permissionName);
    return user.permissions.includes(permissionName);
  }
}

