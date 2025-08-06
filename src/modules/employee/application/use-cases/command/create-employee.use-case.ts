import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Employee } from 'src/modules/employee/domain/employee';
import { EmployeeRepository } from 'src/modules/employee/domain/employee.repository';
import { CreateEmployeeDto } from '../../dto/create-employee.dto';
import { User } from 'src/modules/user/domain/user';
import { hashPassword } from 'src/shared/utils/bcrypt.util';
import { UserRepository } from 'src/modules/user/domain/user.repository';
import { ClinicRepository } from 'src/modules/clinic/domain/clinic.repository';
import { District } from 'src/modules/district/domain/district';
import { DistrictRepository } from 'src/modules/district/domain/district.repository';

@Injectable()
export class CreateEmployeeUseCase {
  constructor(
    @Inject('EmployeeRepository')
    private readonly EmployeeRepository: EmployeeRepository,

    @Inject('UserRepository')
    private readonly userRepository: UserRepository,

    @Inject('ClinicRepository')
    private readonly clinicRepository: ClinicRepository,
    @Inject('DistrictRepository')
    private readonly districtRepository: DistrictRepository,
  ) {}

  async execute(dto: CreateEmployeeDto): Promise<Employee> {
    const userExists = await this.userRepository.findByEmail(dto.email);
    if (userExists) throw new BadRequestException('User already exists');
    const clinic = await this.clinicRepository.findOne(dto.clinic);
    if (!clinic) throw new BadRequestException('Clinic not found');

    let districtExists: District | null = null;
    if (dto.district) {
      districtExists = await this.districtRepository.findOne(dto.district);
    }
    const employee = new Employee({
      name: dto.name,
      surname: dto.surname,
      birth_date: dto.birth_date,
      gender: dto.gender,
      district: districtExists,
      clinic: clinic,
    });

    const user = new User({
      username: dto.name,
      email: dto.email,
      password: await hashPassword(dto.password),

      clinic: clinic,
    });
    return await this.EmployeeRepository.save(employee, user);
  }
}
