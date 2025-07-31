import { Injectable, NotFoundException } from "@nestjs/common";
import { UserRepository } from "../domain/user.repository";
import { User } from "../domain/user";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "src/infrastructure/typeorm/user.orm-entity";
import { UserMapper } from "../mapper/user.mapper";
import { PaginatedResponse } from "src/shared/interface/pagination-response";
import { PaginationDto } from "src/shared/dto/paginationDto";
import { fetchWithPagination } from "src/shared/utils/pagination.builder";
import { RoleEntity } from "src/infrastructure/typeorm/role.orm-entity";
import { PermissionsEntity } from "src/infrastructure/typeorm/permissions.orm-entity";

@Injectable()
export class UserRepositoryOrm implements UserRepository {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>
    ) { }

    async findAll(query: PaginationDto): Promise<PaginatedResponse<User>> {
        const qb = this.userRepository.createQueryBuilder('user');
        qb
            .withDeleted()
            .leftJoinAndSelect('user.roles', 'roles')
            .leftJoinAndSelect('roles.permissions', 'permissions')
            .leftJoinAndSelect('user.permissions', 'user_permissions');
        return fetchWithPagination({
            qb,
            sort: query.sort,
            search: {
                kw: query.search,
                field: 'user.name'
            },
            is_active: query.is_active,
            page: Number(query.page) || 1,
            limit: Number(query.limit) || 10,
            toDomain: UserMapper.toDomain,
        });
    }

    async findByEmail(email: string): Promise<User | null> {
        const user = await this.userRepository.findOne({ where: { email: email }, relations: ['roles', 'roles.permissions', 'permissions', 'clinic'] });
        return user ? UserMapper.toDomain(user) : null;
    }

    async save(user: User): Promise<User> {
        const userEntity = UserMapper.toOrm(user);
        const savedEntity = await this.userRepository.save(userEntity);
        return UserMapper.toDomain(savedEntity);
    }

    async update(id: number, user: User): Promise<User> {
        // console.log(user);
        const userEntity = await this.userRepository.findOne({
            where: { id },
            relations: ['roles', 'permissions'],
        });
        if (!userEntity) throw new NotFoundException('User not found');
        const updatedUser = UserMapper.toOrm(user);
        
        const updated = await this.userRepository.save({
            ...userEntity,
            ...updatedUser
        });
        return UserMapper.toDomain(updated);
    }


    async findOne(id: number): Promise<User | null> {
        const user = await this.userRepository.findOne({ where: { id: id }, relations: ['roles', 'roles.permissions', 'permissions', 'clinic'] });
        return user ? UserMapper.toDomain(user) : null;
    }

    async hardDelete(id: number): Promise<{ message: string }> {
        const user = await this.findOne(id);
        if (!user) throw new NotFoundException('User not found');
        await this.userRepository.delete({ id: id });
        return { message: 'User deleted' };
    }

    async softDelete(id: number): Promise<{ message: string }> {
        const user = await this.findOne(id);
        if (!user) throw new NotFoundException('User not found');
        await this.userRepository.softDelete({ id: id });
        return { message: 'User deleted' };
    }

    async restore(id: number): Promise<{ message: string }> {
        const user = await this.userRepository.findOne({ where: { id }, withDeleted: true });
        if (!user) throw new NotFoundException('User not found');
        await this.userRepository.restore({ id: id });
        return { message: 'User restored' };
    }
}