import { EmployeeEducationsEntity } from "src/infrastructure/typeorm/employee_educations.orm-entity";
import { Employee_education } from "../domain/employee_education";
import { Employee } from "src/modules/employee/domain/employee";
import { EmployeeMapper } from "src/modules/employee/mapper/employee.mapper";
import { formatTimeStamp } from "src/shared/utils/formatTime.util";

export class Employee_educationMapper {
    static toDomain(entity: EmployeeEducationsEntity): Employee_education {
        // console.log(entity);
        return new Employee_education({
            id: entity.id,
            level: entity.level,
            field_of_study: entity.level,
            status: entity.status,
            employee_id: entity.employee_id ? EmployeeMapper.toDomain(entity.employee_id) : null,
            createdAt: entity.createdAt,
            updatedAt: entity.updatedAt,
            deletedAt: entity.deletedAt
        })
    }
    static toOrm(domain: Employee_education): EmployeeEducationsEntity {
        const entity = new EmployeeEducationsEntity();
        if (domain.id) entity.id = domain.id;
        entity.level = domain.level
        entity.field_of_study = domain.field_of_study
        entity.status = domain.status
        if (domain.employee_id) entity.employee_id = EmployeeMapper.toOrm(domain.employee_id)
        return entity
    }

    static toResponse(domain: Employee_education) {
        return {
            id: domain.id,
            level: domain.level,
            field_of_study: domain.field_of_study,
            status: domain.status,
            ...formatTimeStamp(domain.createdAt, domain.updatedAt, domain.deletedAt),
        }
    }
}