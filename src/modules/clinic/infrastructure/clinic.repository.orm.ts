import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { EmployeeEntity } from 'src/infrastructure/typeorm/employee.orm-entity';
import { DataSource, Repository } from 'typeorm';
import { ITransactionManager } from 'src/infrastructure/transaction/transaction.interface';
import { TRANSACTION_MANAGER_SERVICE } from 'src/shared/constants/inject-key';
import { PaginationDto } from 'src/shared/dto/paginationDto';
import { PaginatedResponse } from 'src/shared/interface/pagination-response';
import { fetchWithPagination } from 'src/shared/utils/pagination.builder';
import { SendMail } from 'src/modules/mail/application/use-cases/sendMail';
import { JwtService } from '@nestjs/jwt';
import { ClinicRepository } from '../domain/clinic.repository';
import { Clinic } from '../domain/clinic';
import { ClinicMapper } from '../mapper/clinic.mapper';
import { ClinicEntity } from 'src/infrastructure/typeorm/clinic.orm-entity';

@Injectable()
export class ClinicRepositoryOrm implements ClinicRepository {
  constructor(
    @InjectDataSource() private readonly dataSource: DataSource,
    @Inject(TRANSACTION_MANAGER_SERVICE)
    private readonly transactionManagerService: ITransactionManager,
    @InjectRepository(ClinicEntity)
    private readonly ClinicRepository: Repository<ClinicEntity>,
    // private readonly sendMail: SendMail,
  ) {}

  async save(Clinic: Clinic): Promise<Clinic> {
    try {

        const ClinicOrm = ClinicMapper.toOrm(Clinic)
        const ClinicCreate = this.ClinicRepository.create(ClinicOrm)
        await this.ClinicRepository.save(ClinicCreate)
        return ClinicMapper.toDomain(ClinicCreate)

    } catch (e) {
      throw e;
    }
  }
  async findOne(id: number): Promise<Clinic | null> {
    const Clinic = await this.ClinicRepository.findOne({
      where: { id: id },
    });
    // console.log(Employee);
    return Clinic ? ClinicMapper.toDomain(Clinic) : null;
  }

  async findAll(query: PaginationDto): Promise<PaginatedResponse<Clinic>> {
    const qb = this.ClinicRepository.createQueryBuilder('clinics');
    qb.withDeleted()
    return fetchWithPagination({
      qb,
      sort: query.sort,
      search: {
        kw: query.search,
        field: 'Employee.name',
      },
      is_active: query.is_active,
      page: Number(query.page) || 1,
      limit: Number(query.limit) || 10,
      toDomain: ClinicMapper.toDomain,
    });
  }

  async update(id: number, clinic: Clinic): Promise<Clinic> {
    try {
      const ClinicOrm = ClinicMapper.toOrm(clinic)
      await this.ClinicRepository.update({ id: id }, ClinicOrm)
 const updated = await this.ClinicRepository.findOneBy({ id });
    if (!updated) throw new Error('Clinic not found after update');

    return ClinicMapper.toDomain(updated);
    } catch (e) {
      throw e;
    }
  }

  async hardDelete(id: number): Promise<{ message: string }> {
    try {
      const result = await this.ClinicRepository.delete({ id: id });
      if (result.affected === 0)
        throw new NotFoundException('Clinic not found');
      return { message: 'Clinic deleted' };
    } catch (e) {
      throw e;
    }
  }

  async softDelete(id: number): Promise<{ message: string }> {
    try {
      const result = await this.transactionManagerService.runInTransaction(
        this.dataSource,
        async (manager) => {
          const clinic = await manager.getRepository(ClinicEntity).findOne({
            where: { id: id },
          });
          if (!clinic) throw new NotFoundException('Clinic not found');

          await manager.getRepository(ClinicEntity).softDelete({ id: id });
          return { message: 'Clinic deleted' };
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
          const isClinicExists = await manager
            .getRepository(ClinicEntity)
            .findOne({
              where: { id: id },
              withDeleted: true,
            });
          if (!isClinicExists)
            throw new NotFoundException('Clinic not found');
          await manager.getRepository(ClinicEntity).restore({ id: id });
          return { message: 'Clinic restored' };
        },
      );
      return result;
    } catch (e) {
      throw e;
    }
  }
}
