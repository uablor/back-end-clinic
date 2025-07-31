import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Clinic } from 'src/modules/clinic/domain/clinic';
import { ClinicRepository } from 'src/modules/clinic/domain/clinic.repository';

@Injectable()
export class GetOneClinicUseCase {
  constructor(
    @Inject('ClinicRepository')
    private readonly clinicRepository: ClinicRepository,
  ) {}

  async execute(id: number): Promise<Clinic> {
    const clinic = await this.clinicRepository.findOne(id);
    if (!clinic) throw new NotFoundException('clinic not found');
    return clinic;
  }
}
