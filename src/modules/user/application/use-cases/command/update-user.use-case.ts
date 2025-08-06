import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserRepository } from 'src/modules/user/domain/user.repository';
import { UpdateUserDto } from '../../dto/update-user.dto';
import { GetOneUserUseCase } from '../query/get-one-user.use-case';
import { User } from 'src/modules/user/domain/user';
import { hashPassword } from 'src/shared/utils/bcrypt.util';
import { Permission } from 'src/modules/permission/domain/permission';
import { Role } from 'src/modules/role/domain/role';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleEntity } from 'src/infrastructure/typeorm/role.orm-entity';
@Injectable()
export class UpdateUserUseCase {
  constructor(
    @Inject('UserRepository') private readonly userRepository: UserRepository,
    private readonly getOneUserUseCase: GetOneUserUseCase,

    @InjectRepository(RoleEntity)
    private readonly roleRepository: Repository<RoleEntity>,
  ) {}

  async execute(id: number, dto: UpdateUserDto): Promise<User> {
    const userExists = await this.getOneUserUseCase.execute(id);
    if (!userExists) throw new NotFoundException('User not found');

    if (dto.email && dto.email !== userExists.email) {
      const userWithEmail = await this.userRepository.findByEmail(dto.email);
      if (userWithEmail && userWithEmail.id !== id) {
        throw new ConflictException('Email already exists');
      }
    }

    const validRoles = dto.roles
      ? await this.roleRepository.find({
          where: { id: In(dto.roles) },
        })
      : [];
    if (!validRoles.length) {
      throw new NotFoundException('roles do not exist');
    }

    const user = new User({
      id: id,
      username: dto.username || userExists.username,
      email: dto.email || userExists.email,
      password: dto.password
        ? await hashPassword(dto.password)
        : userExists.password,
      permissions: dto.permissions
        ? dto.permissions.map((p) => new Permission({ id: p }))
        : userExists.permissions,
      is_verified: userExists.is_verified,
    });
    user.addRole(validRoles.map((r) => new Role({ id: r.id })));

    return await this.userRepository.update(id, user);
  }
}
