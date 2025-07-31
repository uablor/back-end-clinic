import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { User } from "src/modules/user/domain/user";
import { hashPassword } from "src/shared/utils/bcrypt.util";
import { CreateCollectionOptions } from "typeorm";
import { Clinic } from "src/modules/clinic/domain/clinic";
import { ClinicRepository } from "src/modules/clinic/domain/clinic.repository";
import { CreateClinicDto } from "../../dto/create-clinic.dto";

@Injectable()
export class CreateClinicUseCase {
    constructor(
        @Inject('ClinicRepository') private readonly clinicRepository: ClinicRepository
    ) { }

    async execute(dto: CreateClinicDto): Promise<Clinic> {
        const clinic = new Clinic({
            name: dto.name,
            latitude: dto.latitude,
            longitude: dto.longitude,
            radius: dto.radius,
            start_time_work: dto.start_time_work,
            end_time_work: dto.end_time_work,
            late_threshold_minutes: dto.late_threshold_minutes
        });
        const createdUser = await this.clinicRepository.save(clinic);
        return createdUser;
    }
}