import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { UserEntity } from 'src/infrastructure/typeorm/user.orm-entity';
import { hashPassword } from 'src/shared/utils/bcrypt.util';
import { PermissionsEntity } from 'src/infrastructure/typeorm/permissions.orm-entity';
import { RoleEntity } from 'src/infrastructure/typeorm/role.orm-entity';
import { ClinicEntity } from 'src/infrastructure/typeorm/clinic.orm-entity';
@Injectable()
export class UsersSeeder {
  constructor() {}

<<<<<<< HEAD
    async seed(manager: EntityManager) {
        const _respository = manager.getRepository(UserEntity);
        const permission = manager.getRepository(PermissionsEntity);
        const role = manager.getRepository(RoleEntity);
        const AllRoles = await role.find({ where: { name: 'super_admin' } });
        const AllPermissions = await permission.find();
        const items = [
            {
                username: 'super admin',
                email: 'super_admin@gmail.com',
                surname: 'super admin',
                password: await hashPassword('super@1234'),
                is_verified: true,
                permissions: AllPermissions,
                roles: AllRoles

            },
            {
                username: 'admin',
                email: 'admin@gmail.com',
                surname: 'admin',
                password: await hashPassword('admin@1234'),
                is_verified: true,
                permissions: AllPermissions,
                roles: AllRoles

            },
            {
                username: 'phet',
                email: 'phetAdmin@gmail.com',
                surname: 'Phet Admin',
                password: await hashPassword('12345678phet'),
                is_verified: true,
                permissions: AllPermissions,
                roles: AllRoles
            },
            {
                username: 'pao',
                email: 'pao@gmail.com',
                surname: 'pao',
                password: await hashPassword('12345678pao'),
                is_verified: true,
                permissions: AllPermissions,
                roles: AllRoles
            },
            {
                username: 'oualor',
                email: 'oualor@gmail.com',
                surname: 'Oualor',
                password: await hashPassword('12345678oualor'),
                is_verified: true,
                permissions: AllPermissions,
                roles: AllRoles
            },
            {
                username: 'user',
                email: 'user@gmail.com',
                surname: 'user',
                password: await hashPassword('user@1234'),
                is_verified: true,
                permissions: AllPermissions,
                roles: AllRoles
            },
        ];
=======
  async seed(manager: EntityManager) {
    const _respository = manager.getRepository(UserEntity);
    const permission = manager.getRepository(PermissionsEntity);
    const role = manager.getRepository(RoleEntity);
    const clinic = manager.getRepository(ClinicEntity);
    const AllRoles = await role.find({ where: { name: 'super_admin' } });
    const AllPermissions = await permission.find();
    const AllClinics = await clinic.find();

    const items = [
      {
        email: 'super_admin@gmail.com',
        username: 'super admin',
        password: await hashPassword('super@1234'),
        is_verified: true,
        permissions: AllPermissions,
        roles: AllRoles,
       clinic_id: AllClinics[0]?.id,

      },
      {
        email: 'admin@gmail.com',
        username: 'admin',
        password: await hashPassword('admin@1234'),
        is_verified: true,
        permissions: AllPermissions,
        roles: AllRoles,
        clinic_id: AllClinics[0]?.id,
>>>>>>> master

      },
      {
        email: 'phetAdmin@gmail.com',
        username: 'Phet Admin',
        password: await hashPassword('12345678phet'),
        is_verified: true,
        permissions: AllPermissions,
        roles: AllRoles,
        clinic_id: AllClinics[0]?.id,

      },
      {
        email: 'pao@gmail.com',
        username: 'pao',
        password: await hashPassword('12345678pao'),
        is_verified: true,
        permissions: AllPermissions,
        roles: AllRoles,
        clinic_id: AllClinics[0]?.id,

      },
      {
        email: 'oualor@gmail.com',
        username: 'Oualor',
        password: await hashPassword('12345678oualor'),
        is_verified: true,
        permissions: AllPermissions,
        roles: AllRoles,
        clinic_id: AllClinics[0]?.id,

      },
      {
        email: 'user@gmail.com',
        username: 'user',
        password: await hashPassword('user@1234'),
        is_verified: true,
        permissions: AllPermissions,
        roles: AllRoles,
        clinic_id: AllClinics[0]?.id,

      },
    ];

    for (const item of items) {
      const existingItem = await _respository.findOne({
        where: { email: item.email },
      });
      if (!existingItem) {
        const items = _respository.create(item);
        await _respository.save(items);
        console.log(`✅ Created User: ${item.email}`);
      } else {
        console.log(`⏩ Already exists: ${item.email}`);
      }
    }

    console.log('🎉 User seeding complete.');
  }
}
