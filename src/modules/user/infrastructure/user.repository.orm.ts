import { Inject, Injectable, NotFoundException, Delete } from '@nestjs/common';
import { UserRepository } from '../domain/user.repository';
import { User } from '../domain/user';
import { DataSource, Repository } from 'typeorm';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/infrastructure/typeorm/user.orm-entity';
import { UserMapper } from '../mapper/user.mapper';
import { PaginatedResponse } from 'src/shared/interface/pagination-response';
import { PaginationDto } from 'src/shared/dto/paginationDto';
import { fetchWithPagination } from 'src/shared/utils/pagination.builder';
import { RoleEntity } from 'src/infrastructure/typeorm/role.orm-entity';
import { PermissionsEntity } from 'src/infrastructure/typeorm/permissions.orm-entity';
import { JwtService } from '@nestjs/jwt';
import { TRANSACTION_MANAGER_SERVICE } from 'src/shared/constants/inject-key';
import { ITransactionManager } from 'src/infrastructure/transaction/transaction.interface';
import { EmployeeEntity } from 'src/infrastructure/typeorm/employee.orm-entity';
import { SendMail } from 'src/modules/mail/application/use-cases/sendMail';
import e from 'express';
import { EmployeeEducationsEntity } from 'src/infrastructure/typeorm/employee_educations.orm-entity';

@Injectable()
export class UserRepositoryOrm implements UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService,
    @InjectDataSource() private readonly dataSource: DataSource,

    @Inject(TRANSACTION_MANAGER_SERVICE)
    private readonly transactionManagerService: ITransactionManager,

    private readonly sendMail: SendMail,
  ) {}

  async findAll(query: PaginationDto): Promise<PaginatedResponse<User>> {
    const qb = this.userRepository.createQueryBuilder('user');
    qb.withDeleted()
      .leftJoinAndSelect('user.roles', 'roles')
      .leftJoinAndSelect('roles.permissions', 'permissions')
      .leftJoinAndSelect('user.permissions', 'user_permissions')
      .leftJoinAndSelect('user.clinic', 'clinic');

    return fetchWithPagination({
      qb,
      sort: query.sort,
      search: {
        kw: query.search,
        field: 'user.username',
      },
      is_active: query.is_active,
      page: Number(query.page) || 1,
      limit: Number(query.limit) || 10,
      type: query.type,
      toDomain: UserMapper.toDomain,
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.userRepository.findOne({
      where: { email: email },
      relations: ['roles', 'roles.permissions', 'permissions', 'clinic'],
    });
    return user ? UserMapper.toDomain(user) : null;
  }

  async save(user: User): Promise<User> {
    const userEntity = UserMapper.toOrm(user);
    const token = await this.jwtService.signAsync({
      email: user.email,
    });
    const savedEntity = await this.userRepository.save(userEntity);
    await this.sendMail.execute(
      savedEntity.email,
      'Bienvenido a la plataforma',
      'welcome',
      {
        name: savedEntity.username,
        url: `https://sysamay-clinic.netlify.app/verify-email?token=${token}`,
      },
    );
    return UserMapper.toDomain(savedEntity);
  }
  async update(id: number, user: User): Promise<User> {
    const userEntity = await this.userRepository.findOne({
      where: { id },
      relations: ['roles', 'permissions'],
    });
    if (!userEntity) throw new NotFoundException('User not found');
    const updatedUser = UserMapper.toOrm(user);

    const updated = await this.userRepository.save({
      ...userEntity,
      ...updatedUser,
    });
    return UserMapper.toDomain(updated);
  }

  async findOne(id: number): Promise<User | null> {
    const user = await this.userRepository.findOne({
      where: { id: id },
      relations: ['roles', 'roles.permissions', 'permissions', 'clinic'],
    });
    return user ? UserMapper.toDomain(user) : null;
  }

  async hardDelete(id: number): Promise<{ message: string }> {
    try {
      const result = await this.transactionManagerService.runInTransaction(
        this.dataSource,
        async (manager) => {
          const is_user = await manager.getRepository(UserEntity).findOne({
            where: { id: id },
            relations: ['employee', 'employee.educations'],
            withDeleted: true,
          });
          if (!is_user) throw new NotFoundException('user not found');
          if (is_user.employee) {
            const is_employee = await manager
              .getRepository(EmployeeEntity)
              .findOne({
                where: { id: is_user.employee.id },
                withDeleted: true,
              });
            if (is_employee) {
              const employeeEducations = await manager
                .getRepository(EmployeeEducationsEntity)
                .find({
                  where: { employee_id: { id: is_employee.id } },
                  withDeleted: true,
                });

              if (employeeEducations.length > 0) {
                for (const education of employeeEducations) {
                  await manager
                    .getRepository(EmployeeEducationsEntity)
                    .delete({ id: education.id });
                }
              }
              await manager
                .getRepository(EmployeeEntity)
                .delete({ id: is_employee.id });
            }
          }
          await manager.getRepository(UserEntity).delete({ id: id });

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
          const is_user = await manager.getRepository(UserEntity).findOne({
            where: { id: id },
            relations: ['employee', 'employee.educations'],
          });
          if (!is_user) throw new NotFoundException('user not found');
          await manager.getRepository(UserEntity).softDelete({ id: id });
          if (is_user.employee) {
            const is_employee = await manager
              .getRepository(EmployeeEntity)
              .findOne({
                where: { id: is_user.employee.id },
                withDeleted: true,
              });
            if (is_employee) {
              const employeeEducations = await manager
                .getRepository(EmployeeEducationsEntity)
                .find({
                  where: { employee_id: { id: is_employee.id } },
                  withDeleted: true,
                });

              if (employeeEducations.length > 0) {
                for (const education of employeeEducations) {
                  await manager
                    .getRepository(EmployeeEducationsEntity)
                    .softDelete({ id: education.id });
                }
              }
              await manager
                .getRepository(EmployeeEntity)
                .softDelete({ id: is_employee.id });
            }
          }
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
          const is_user = await manager.getRepository(UserEntity).findOne({
            where: { id: id },
            withDeleted: true,
            relations: ['employee', 'employee.educations'],
          });
          if (!is_user) throw new NotFoundException('user not found');
          if (is_user) {
            const employeeEducations = await manager
              .getRepository(EmployeeEducationsEntity)
              .find({
                where: { employee_id: { id: is_user.employee.id } },
                withDeleted: true,
              });

            if (employeeEducations.length > 0) {
              for (const education of employeeEducations) {
                await manager
                  .getRepository(EmployeeEducationsEntity)
                  .restore({ id: education.id });
              }
            }
            await manager
              .getRepository(EmployeeEntity)
              .restore({ id: is_user.employee.id });
          }

          await manager.getRepository(UserEntity).restore({ id: id });
          return { message: 'User restored' };
        },
      );
      return result;
    } catch (e) {
      throw e;
    }
  }

  async uploadAvatar(
    userId: number,
    avatarPath: string,
  ): Promise<string | null> {
    await this.userRepository.update(userId, { avatar: avatarPath });
    return avatarPath;
  }
}
