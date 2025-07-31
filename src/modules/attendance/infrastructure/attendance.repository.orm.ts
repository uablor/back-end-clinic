import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';

import { PaginationDto } from 'src/shared/dto/paginationDto';
import { PaginatedResponse } from 'src/shared/interface/pagination-response';
import { fetchWithPagination } from 'src/shared/utils/pagination.builder';
import { AttendanceRepository } from '../domain/attendance.repository';
import { AttendanceEntity } from 'src/infrastructure/typeorm/attendance.orm-entity';
import { Attendance } from '../domain/attendance';
import { AttendanceMapper } from '../mapper/attendance.mapper';

@Injectable()
export class AttendanceRepositoryOrm implements AttendanceRepository {
  constructor(
    @InjectRepository(AttendanceEntity)
    private readonly AttendanceRepository: Repository<AttendanceEntity>,
  ) {}

  async save(attendance: Attendance): Promise<Attendance> {
    try {
      const attendanceEntity = AttendanceMapper.toOrm(attendance);
      const savedAttendance =
        await this.AttendanceRepository.save(attendanceEntity);
      return AttendanceMapper.toDomain(savedAttendance);
    } catch (e) {
      throw e;
    }
  }

  async findAll(query: PaginationDto): Promise<PaginatedResponse<Attendance>> {
    const qb = this.AttendanceRepository.createQueryBuilder('attendance');
    qb.withDeleted()
      .leftJoinAndSelect('attendance.user', 'user')
      .leftJoinAndSelect('attendance.clinic', 'clinic');
    return fetchWithPagination({
      qb,
      sort: query.sort,
      search: {
        kw: query.search,
        field: 'user.name',
      },
      is_active: query.is_active,
      page: Number(query.page) || 1,
      limit: Number(query.limit) || 10,
      toDomain: AttendanceMapper.toDomain,
    });
  }

  async findOne(id: number): Promise<Attendance | null> {
    const user = await this.AttendanceRepository.findOne({
      where: { id: id },
      relations: ['clinic', 'user'],
    });
    return user ? AttendanceMapper.toDomain(user) : null;
  }

  async hardDelete(id: number): Promise<{ message: string }> {
    const user = await this.findOne(id);
    if (!user) throw new NotFoundException('User not found');
    await this.AttendanceRepository.delete({ id: id });
    return { message: 'User deleted' };
  }

  async softDelete(id: number): Promise<{ message: string }> {
    const user = await this.findOne(id);
    if (!user) throw new NotFoundException('User not found');
    await this.AttendanceRepository.softDelete({ id: id });
    return { message: 'User deleted' };
  }

  async restore(id: number): Promise<{ message: string }> {
    const user = await this.AttendanceRepository.findOne({
      where: { id },
      withDeleted: true,
    });
    if (!user) throw new NotFoundException('User not found');
    await this.AttendanceRepository.restore({ id: id });
    return { message: 'User restored' };
  }

  async findByDateRangeAndUserId(
    type: 'userId' | 'id',
    id: number,
    start: Date,
    end: Date,
  ): Promise<Attendance | null> {
    const attendanceEntity = await this.AttendanceRepository.findOne({
      where: {
        [type]: id,
        date: Between(start, end),
      },
    });
    return attendanceEntity
      ? AttendanceMapper.toDomain(attendanceEntity)
      : null;
  }

  async update(id: number, attendance: Attendance): Promise<Attendance> {
    const userEntity = await this.AttendanceRepository.findOne({
      where: { id },
      relations: ['clinic', 'user'],
    });
    if (!userEntity) throw new NotFoundException('attendance not found');
    const updatedUser = AttendanceMapper.toOrm(attendance);

    const updated = await this.AttendanceRepository.save({
      ...userEntity,
      ...updatedUser,
    });
    return AttendanceMapper.toDomain(updated);
  }
}
