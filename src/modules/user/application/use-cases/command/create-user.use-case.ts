import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { UserRepository } from "src/modules/user/domain/user.repository";
import { CreateUserDto } from "../../dto/create-user.dto";
import { User } from "src/modules/user/domain/user";
import { hashPassword } from "src/shared/utils/bcrypt.util";
import { ClinicRepository } from "src/modules/clinic/domain/clinic.repository";

@Injectable()
export class CreateUserUseCase {
    constructor(
        @Inject('UserRepository') private readonly userRepository: UserRepository,
         @Inject('ClinicRepository') private readonly clinicRepository: ClinicRepository
    ) { }

    async execute(dto: CreateUserDto): Promise<User> {
        const userExists = await this.userRepository.findByEmail(dto.email);
        if (userExists) throw new BadRequestException('User already exists');

        const clinic = await this.clinicRepository.findOne(dto.clinic);
        if (!clinic) throw new BadRequestException('Clinic not found');

        const user = new User({
            username: dto.username,
            email: dto.email,
            clinic: clinic,
            password: await hashPassword(dto.password)
        });
        const createdUser = await this.userRepository.save(user);
        return createdUser;
    }
}