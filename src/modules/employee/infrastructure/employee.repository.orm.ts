import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { EmployeeEntity } from 'src/infrastructure/typeorm/employee.orm-entity';
import { DataSource, Repository } from 'typeorm';
import { ITransactionManager } from 'src/infrastructure/transaction/transaction.interface';
import { EmployeeMapper } from '../mapper/employee.mapper';
import { User } from 'src/modules/user/domain/user';
import { UserMapper } from 'src/modules/user/mapper/user.mapper';
import { UserEntity } from 'src/infrastructure/typeorm/user.orm-entity';
import { TRANSACTION_MANAGER_SERVICE } from 'src/shared/constants/inject-key';
import { PaginationDto } from 'src/shared/dto/paginationDto';
import { PaginatedResponse } from 'src/shared/interface/pagination-response';
import { fetchWithPagination } from 'src/shared/utils/pagination.builder';
import { SendMail } from 'src/modules/mail/application/use-cases/sendMail';
import { JwtService } from '@nestjs/jwt';
import { Employee } from '../domain/employee';
import { EmployeeRepository } from '../domain/employee.repository';
import { RoleEntity } from 'src/infrastructure/typeorm/role.orm-entity';

@Injectable()
export class EmployeeRepositoryOrm implements EmployeeRepository {
  constructor(
    private readonly jwtService: JwtService,
    @InjectDataSource() private readonly dataSource: DataSource,
    @Inject(TRANSACTION_MANAGER_SERVICE)
    private readonly transactionManagerService: ITransactionManager,
    @InjectRepository(EmployeeEntity)
    private readonly EmployeeRepository: Repository<EmployeeEntity>,
    private readonly sendMail: SendMail,
  ) {}

  async save(Employee: Employee, user: User): Promise<Employee> {
    try {
      const result = await this.transactionManagerService.runInTransaction(
        this.dataSource,
        async (manager) => {
          const userEntity = UserMapper.toOrm(user);
          const emaployee_role = await manager
            .getRepository(RoleEntity)
            .findOne({ where: { name: 'employee' } });
          const savedUser = await manager.getRepository(UserEntity).save({
            ...userEntity,
            roles: emaployee_role ? [{ id: emaployee_role.id }] : [],
          });
          const employeeEntity = EmployeeMapper.toOrm({
            ...Employee,
            user: UserMapper.toDomain(savedUser),
          });
          const token = await this.jwtService.signAsync({
            email: user.email,
          });
          const savedEmployee = manager
            .getRepository(EmployeeEntity)
            .save(employeeEntity);
          const savedEntity = await savedEmployee;
          await this.sendMail.execute(
            user.email,
            'Bienvenido a la plataforma',
            'Bienvenido a la plataforma',
            `http://localhost:3000/verify/${token}`,
          );
          return EmployeeMapper.toDomain(savedEntity);
        },
      );
      return result;
    } catch (e) {
      throw e;
    }
  }
  async findOne(id: number): Promise<Employee | null> {
    try {
      const Employee = await this.EmployeeRepository.findOne({
        where: { id: id },
        relations: [
          'user',
          'district',
          'clinic',
          'district.province',
          'educations',
          'educations.employee_id',
          'educations.employee_id.user',
        ],
      });
      return Employee ? EmployeeMapper.toDomain(Employee) : null;
    } catch (error) {
      console.error('Error finding employee:', error);
      throw new NotFoundException('Employee not found');
    }
  }
async findAll(query: PaginationDto): Promise<PaginatedResponse<Employee>> {
  const qb = this.EmployeeRepository.createQueryBuilder('employees');
  qb.withDeleted()
    .leftJoinAndSelect('employees.user', 'user')
    .leftJoinAndSelect('employees.educations', 'educations')
    .leftJoinAndSelect('employees.clinic', 'clinic')
    .leftJoinAndSelect('employees.district', 'district')
    .leftJoinAndSelect('district.province', 'province');

  return fetchWithPagination({
    qb,
    sort: query.sort,
    search: {
      kw: query.search,
      field: 'employees.name',
    },
    is_active: query.is_active,
    page: Number(query.page) || 1,
    limit: Number(query.limit) || 10,
    toDomain: EmployeeMapper.toDomain,
  });
}

  async update(id: number, Employee: Employee): Promise<Employee> {
    try {
      const result = await this.transactionManagerService.runInTransaction(
        this.dataSource,
        async (manager) => {
          const isEmployeeExists = await manager
            .getRepository(EmployeeEntity)
            .findOne({ where: { id: id }, relations: ['user'] });
          if (!isEmployeeExists)
            throw new NotFoundException('Employee not found');
          const userDomain = UserMapper.toDomain(isEmployeeExists.user);
          userDomain.username = Employee.surname || userDomain.username;
          await manager.getRepository(EmployeeEntity).update(
            { id: id },
            EmployeeMapper.toOrm({
              ...Employee,
              user: UserMapper.toDomain(isEmployeeExists.user),
            }),
          );
          await manager
            .getRepository(UserEntity)
            .save(UserMapper.toOrm(userDomain));
          const employeeEntity = await manager
            .getRepository(EmployeeEntity)
            .findOne({
              where: { id: id },
              relations: ['user', 'district', 'district.province'],
            });
          return EmployeeMapper.toDomain(employeeEntity!);
        },
      );
      return result;
    } catch (e) {
      throw e;
    }
  }

  async hardDelete(id: number): Promise<{ message: string }> {
    try {
      const result = await this.transactionManagerService.runInTransaction(
        this.dataSource,
        async (manager) => {
          const isEmployeeExists = await manager
            .getRepository(EmployeeEntity)
            .findOne({
              where: { id: id },
              relations: ['user'],
              withDeleted: true,
            });
          if (!isEmployeeExists)
            throw new NotFoundException('Employee not found');
          await manager.getRepository(EmployeeEntity).delete({ id: id });
          await manager
            .getRepository(UserEntity)
            .delete({ id: isEmployeeExists.user.id });
          return { message: 'User deleted' };
        },
      );
      return result;
    } catch (e) {
      throw e;
    }
  }

  async softDelete(id: number): Promise<{ message: string }> {
    try {
      const result = await this.transactionManagerService.runInTransaction(
        this.dataSource,
        async (manager) => {
          const isEmployeeExists = await manager
            .getRepository(EmployeeEntity)
            .findOne({ where: { id: id }, relations: ['user'] });
          if (!isEmployeeExists)
            throw new NotFoundException('Employee not found');
          await manager.getRepository(EmployeeEntity).softDelete({ id: id });
          await manager
            .getRepository(UserEntity)
            .softDelete({ id: isEmployeeExists.user.id });
          return { message: 'User deleted' };
        },
      );
      return result;
    } catch (e) {
      throw e;
    }
  }

  async restore(id: number): Promise<{ message: string }> {
    try {
      const result = await this.transactionManagerService.runInTransaction(
        this.dataSource,
        async (manager) => {
          const isEmployeeExists = await manager
            .getRepository(EmployeeEntity)
            .findOne({
              where: { id: id },
              withDeleted: true,
              relations: ['user'],
            });
          if (!isEmployeeExists)
            throw new NotFoundException('Employee not found');
          await manager.getRepository(EmployeeEntity).restore({ id: id });
          await manager
            .getRepository(UserEntity)
            .restore({ id: isEmployeeExists.user.id });
          return { message: 'User restored' };
        },
      );
      return result;
    } catch (e) {
      throw e;
    }
  }
}
