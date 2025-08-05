import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { Clinic } from "src/modules/clinic/domain/clinic";
import { ClinicRepository } from "src/modules/clinic/domain/clinic.repository";
import { CreateClinicDto } from "../../dto/create-clinic.dto";
import { DistrictRepository } from "src/modules/district/domain/district.repository";

@Injectable()
export class CreateClinicUseCase {
    constructor(
        @Inject('ClinicRepository') private readonly clinicRepository: ClinicRepository,
        @Inject('DistrictRepository') private readonly districtRepository: DistrictRepository
    ) { }

    async execute(dto: CreateClinicDto): Promise<Clinic> {
        const district = dto.district ? await this.districtRepository.findOne(dto.district) : null;
        if (!district) throw new BadRequestException('District not found');
        const clinic = new Clinic({
            name: dto.name,
            latitude: dto.latitude,
            longitude: dto.longitude,
            radius: dto.radius,
            start_time_work: dto.start_time_work,
            end_time_work: dto.end_time_work,
            late_threshold_minutes: dto.late_threshold_minutes,
            district: district
        });
        const createdUser = await this.clinicRepository.save(clinic);
        return createdUser;
    }
}
