import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { RoleEntity } from 'src/infrastructure/typeorm/role.orm-entity';
import { PermissionsEntity } from 'src/infrastructure/typeorm/permissions.orm-entity';
@Injectable()
export class RolesSeeder {
    constructor() { }

    async seed(manager: EntityManager) {
        const _respository = manager.getRepository(RoleEntity);
        const permission = manager.getRepository(PermissionsEntity);
        const AllPermissions = await permission.find();
        const items = [
            { id: 1, name: 'super_admin', display_name: 'Super Admin', permissions: AllPermissions },
            // {
            //     id: 2,
            //     name: 'Employee',
            //     display_name: 'Employee',
            //     permissions: [
            //         {
            //             "id": 1,
            //             "name": "get_one_user",
            //             "display_name": "GET ONE USER"
            //         },
            //         {
            //             "id": 2,
            //             "name": "get_all_user",
            //             "display_name": "GET ALL USER"
            //         },
            //         {
            //             "id": 8,
            //             "name": "get_one_teacher",
            //             "display_name": "GET ONE TEACHER"
            //         },
            //         {
            //             "id": 9,
            //             "name": "get_all_teacher",
            //             "display_name": "GET ALL TEACHER"
            //         },
            //         {
            //             "id": 15,
            //             "name": "get_one_Employee_education",
            //             "display_name": "GET ONE Employee EDUCATION"
            //         },
            //         {
            //             "id": 16,
            //             "name": "update_Employee_education",
            //             "display_name": "UPDATE Employee EDUCATION"
            //         },
            //         {
            //             "id": 17,
            //             "name": "get_one_role",
            //             "display_name": "GET ONE ROLE"
            //         },
            //         {
            //             "id": 18,
            //             "name": "get_all_role",
            //             "display_name": "GET ALL ROLE"
            //         },
            //         {
            //             "id": 24,
            //             "name": "get_all_permssion",
            //             "display_name": "GET ALL PERMSSION"
            //         },
            //         {
            //             "id": 25,
            //             "name": "create_Employee",
            //             "display_name": "CREATE Employee"
            //         },
            //         {
            //             "id": 26,
            //             "name": "get_one_course_completion_records",
            //             "display_name": "GET ONE COURSE COMPLETION RECORDS"
            //         },
            //         {
            //             "id": 27,
            //             "name": "get_all_course_completion_records",
            //             "display_name": "GET ALL COURSE COMPLETION RECORDS"
            //         },
            //         {
            //             "id": 33,
            //             "name": "get_one_course_category",
            //             "display_name": "GET ONE COURSE CATEGORY"
            //         },
            //         {
            //             "id": 34,
            //             "name": "get_all_course_category",
            //             "display_name": "GET ALL COURSE CATEGORY"
            //         },
            //         {
            //             "id": 40,
            //             "name": "get_one_course",
            //             "display_name": "GET ONE COURSE"
            //         },
            //         {
            //             "id": 41,
            //             "name": "get_all_course",
            //             "display_name": "GET ALL COURSE"
            //         },
            //         {
            //             "id": 48,
            //             "name": "get_one_apply_courses",
            //             "display_name": "GET ONE APPLY COURSES"
            //         },
            //         {
            //             "id": 49,
            //             "name": "get_all_apply_courses",
            //             "display_name": "GET ALL APPLY COURSES"
            //         },
            //         {
            //             "id": 50,
            //             "name": "update_apply_courses",
            //             "display_name": "UPDATE APPLY COURSES"
            //         },
            //         {
            //             "id": 51,
            //             "name": "soft_delete_apply_courses",
            //             "display_name": "SOFT DELETE APPLY COURSES"
            //         },
            //         {
            //             "id": 52,
            //             "name": "restore_apply_courses",
            //             "display_name": "RESTORE APPLY COURSES"
            //         },
            //         {
            //             "id": 53,
            //             "name": "hard_delete_apply_courses",
            //             "display_name": "HARD DELETE APPLY COURSES"
            //         },
            //         {
            //             "id": 54,
            //             "name": "create_apply_courses",
            //             "display_name": "CREATE APPLY COURSES"
            //         },
            //         {
            //             "id": 55,
            //             "name": "hard_delete_Employee_education",
            //             "display_name": "HARD DELETE Employee EDUCATION"
            //         },
            //         {
            //             "id": 56,
            //             "name": "create_Employee_education",
            //             "display_name": "CREATE Employee EDUCATION"
            //         },
            //         {
            //             "id": 57,
            //             "name": "get_one_Employee",
            //             "display_name": "GET ONE Employee"
            //         },
            //         {
            //             "id": 58,
            //             "name": "get_all_Employee",
            //             "display_name": "GET ALL Employee"
            //         },
            //         {
            //             "id": 59,
            //             "name": "update_Employee",
            //             "display_name": "UPDATE Employee"
            //         },
            //         {
            //             "id": 63,
            //             "name": "get_email_user",
            //             "display_name": "GET EMAIL USER"
            //         }
            //     ]
            // },

        ];

        for (const item of items) {
            const existingItem = await _respository.findOne({ where: { name: item.name } });
            if (!existingItem) {
                const role = _respository.create(item);
                await _respository.save(role);
                console.log(`✅ Created Role: ${item.name}`);

            }
            else {
                console.log(`⏩ Already exists: ${item.name}`);
            }
        }

        console.log('🎉 Role seeding complete.');
    }
}
