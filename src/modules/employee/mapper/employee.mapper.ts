import { formatTimeStamp, formatTimeUtil } from "src/shared/utils/formatTime.util";
import { IPagination } from "src/shared/interface/pagination-interface";

import { EmployeeEntity } from "src/infrastructure/typeorm/employee.orm-entity";
import { UserMapper } from "src/modules/user/mapper/user.mapper";
import { DistrictMapper } from "src/modules/district/mapper/district.mapper";
import { Employee } from "../domain/employee";
import { Employee_educationMapper } from "src/modules/employee_education/mapper/employee_education.mapper";


export class EmployeeMapper {

    static toDomain(entity: EmployeeEntity): Employee {
        return new Employee({
            id: entity.id,
            name: entity.name,
            surname: entity.surname,
            birth_date: entity.birth_date,
            gender: entity.gender,
            user: UserMapper.toDomain(entity.user),
            district: entity.district ? DistrictMapper.toDomain(entity.district) : null,
            educations: entity.educations ? entity.educations.map((education) => Employee_educationMapper.toDomain(education)) : [],
            createdAt: entity.createdAt,
            updatedAt: entity.updatedAt,
            deletedAt: entity.deletedAt
        });
    }

    static toOrm(domain: Employee): EmployeeEntity {
        const entity = new EmployeeEntity();
        if (domain.id !== undefined) entity.id = domain.id;
        entity.name = domain.name;
        entity.surname = domain.surname;
        entity.user = UserMapper.toOrm(domain.user!);
        if (domain.birth_date) entity.birth_date = domain.birth_date;
        if (domain.gender) entity.gender = domain.gender;
        if (domain.district) entity.district = DistrictMapper.toOrm(domain.district!);
        return entity;
    }
    static toResponse(domain: Employee) {
        // console.log(domain);
        return {
            id: domain.id!,
            name: domain.name,
            surname: domain.surname,
            email: domain.user!.email,
            birth_date: domain.birth_date ? formatTimeUtil(domain.birth_date) : null,
            gender: domain.gender ? domain.gender : null,
            district_id: domain.district ? domain.district.id : null,
            district: domain.district ? domain.district.name : null,
            distinct_en: domain.district ? domain.district.name_en : null,
            province_id: domain.district ? domain.district.province.id : null,
            province: domain.district ? domain.district.province.name : null,
            province_en: domain.district ? domain.district.province.name_en : null,
            educations: domain.educations ? domain.educations.map((education) => Employee_educationMapper.toResponse(education)) : [],
            ...formatTimeStamp(domain.createdAt, domain.updatedAt, domain.deletedAt)
        };
    }
    static toResponseList(users: Employee[], pagination: IPagination) {
        return {
            data: users.map(user => this.toResponse(user)),
            pagination
        };
    }
}

