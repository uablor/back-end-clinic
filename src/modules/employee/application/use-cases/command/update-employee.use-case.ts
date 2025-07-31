import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { EmployeeRepository } from "src/modules/employee/domain/employee.repository";
import { UpdateEmployeeDto } from "../../dto/update-employee.dto";
import { Employee } from "src/modules/employee/domain/employee";
import { DistrictRepository } from "src/modules/district/domain/district.repository";
import { District } from "src/modules/district/domain/district";

@Injectable()
export class UpdateEmployeeUseCase {
    constructor(
        @Inject('EmployeeRepository') private readonly EmployeeRepository: EmployeeRepository,
        @Inject('DistrictRepository') private readonly districtRepository: DistrictRepository
    ) { }

    async execute(id: number, dto: UpdateEmployeeDto): Promise<Employee> {
        const EmployeeExists = await this.EmployeeRepository.findOne(id);
        if (!EmployeeExists) throw new NotFoundException('Employee not found');
        let districtExists: District | null = null;
        if (dto.district) {
            districtExists = await this.districtRepository.findOne(dto.district);
        }
        const employee = new Employee({
            name: dto.name || EmployeeExists.name,
            surname: dto.surname || EmployeeExists.surname,
            birth_date: dto.birth_date || EmployeeExists.birth_date,
            gender: dto.gender || EmployeeExists.gender,
            district: dto.district ? districtExists : EmployeeExists.district
        });

        return await this.EmployeeRepository.update(id, employee);
    }

}