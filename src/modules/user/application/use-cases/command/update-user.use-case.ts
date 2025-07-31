import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { UserRepository } from "src/modules/user/domain/user.repository";
import { UpdateUserDto } from "../../dto/update-user.dto";
import { GetOneUserUseCase } from "../query/get-one-user.use-case";
import { User } from "src/modules/user/domain/user";
import { hashPassword } from "src/shared/utils/bcrypt.util";
import { Permission } from "src/modules/permission/domain/permission";
import { Role } from "src/modules/role/domain/role";
import { ClinicRepository } from "src/modules/clinic/domain/clinic.repository";
@Injectable()
export class UpdateUserUseCase {
    constructor(
        @Inject('UserRepository') private readonly userRepository: UserRepository,
        private readonly getOneUserUseCase: GetOneUserUseCase,

            @Inject('ClinicRepository')
            private readonly clinicRepository: ClinicRepository,
    ) { }

    async execute(id: number, dto: UpdateUserDto): Promise<User> {
        if (!dto.clinic) throw new NotFoundException('User not found');
        const clinicExists = await this.clinicRepository.findOne(dto.clinic);
        const userExists = await this.getOneUserUseCase.execute(id);
        if (!userExists) throw new NotFoundException('User not found');
        const user = new User({
            id: id,
            username: dto.username || userExists.username,
            email: dto.email || userExists.email,
            clinic: clinicExists || userExists.clinic,
            password: dto.password ? await hashPassword(dto.password) : userExists.password,
            permissions: dto.permissions ? dto.permissions.map(p => new Permission({ id: p })) : userExists.permissions,
            is_verified: userExists.is_verified
        })
        user.addRole(dto.roles ? dto.roles.map(r => new Role({ id: r })) : userExists.roles);
        return await this.userRepository.update(id, user);
    }
}