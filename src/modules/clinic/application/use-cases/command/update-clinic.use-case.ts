import { Inject, Injectable, NotFoundException } from '@nestjs/common';

import { Clinic } from 'src/modules/clinic/domain/clinic';
import { ClinicRepository } from 'src/modules/clinic/domain/clinic.repository';
import { UpdateClinicDto } from '../../dto/update-clinic.dto';
import { District } from 'src/modules/district/domain/district';
import { DistrictRepository } from 'src/modules/district/domain/district.repository';

@Injectable()
export class UpdateClinicUseCase {
  constructor(
    @Inject('ClinicRepository')
    private readonly clinicRepository: ClinicRepository,
    @Inject('DistrictRepository') private readonly districtRepository: DistrictRepository,
  ) {}

  async execute(id: number, dto: UpdateClinicDto): Promise<Clinic> {
    const EmployeeExists = await this.clinicRepository.findOne(id);
    if (!EmployeeExists) throw new NotFoundException('Employee not found');
    let districtExists: District | null = null;
    if (dto.district) {
      districtExists = await this.districtRepository.findOne(dto.district);
    }
    const clinic = new Clinic({
      name: dto.name || EmployeeExists.name,
      latitude: dto.latitude || EmployeeExists.latitude,
      longitude: dto.longitude || EmployeeExists.longitude,
      radius: dto.radius || EmployeeExists.radius,
      district: dto.district ? districtExists : EmployeeExists.district,
      start_time_work: dto.start_time_work || EmployeeExists.start_time_work,
      end_time_work: dto.end_time_work || EmployeeExists.end_time_work,
      late_threshold_minutes:
        dto.late_threshold_minutes || EmployeeExists.late_threshold_minutes,
    });
    const createdUser = await this.clinicRepository.update(id, clinic);
    return createdUser;
  }
}
