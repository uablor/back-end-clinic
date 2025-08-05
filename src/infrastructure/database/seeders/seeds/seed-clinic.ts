import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { ClinicEntity } from 'src/infrastructure/typeorm/clinic.orm-entity';
import { DistrictEntity } from 'src/infrastructure/typeorm/district.orm-entity'; // หากคุณต้องการใช้ District

@Injectable()
export class ClinicsSeeder {
  constructor() {}

  async seed(manager: EntityManager) {
    const clinicRepository = manager.getRepository(ClinicEntity);
    const districtRepository = manager.getRepository(DistrictEntity);

    // หากคุณต้องการใช้ district ID ในการเชื่อมโยง clinic
    const allDistricts = await districtRepository.find();

    const clinics = [
      {
        name: 'Clinic A',
        latitude: 18.010099127071133, 
        longitude: 102.6324452110516,
        radius: 500,
        start_time_work: '08:00:00',
        end_time_work: '17:00:00',
        late_threshold_minutes: 15,
        district: allDistricts[0] || null, 
      },
      {
        name: 'Clinic B',
        latitude: 18.010099127071133,
        longitude: 102.6324452110516,
        radius: 600,
        start_time_work: '09:00:00',
        end_time_work: '18:00:00',
        late_threshold_minutes: 20,
        district: allDistricts[1] || null, 
      },
      {
        name: 'Clinic C',
        latitude: 18.010099127071133,
        longitude: 102.6324452110516,
        radius: 700,
        start_time_work: '07:30:00',
        end_time_work: '16:30:00',
        late_threshold_minutes: 10,
        district: allDistricts[2] || null, 
      },
    ];

    // Loop ผ่าน clinics ที่จะสร้าง
    for (const clinicData of clinics) {
      const existingClinic = await clinicRepository.findOne({
        where: { name: clinicData.name },
      });

      if (!existingClinic) {
        const clinic = clinicRepository.create(clinicData);
        await clinicRepository.save(clinic);
        console.log(`✅ Created Clinic: ${clinicData.name}`);
      } else {
        console.log(`⏩ Clinic already exists: ${clinicData.name}`);
      }
    }

    console.log('🎉 Clinic seeding complete.');
  }
}
