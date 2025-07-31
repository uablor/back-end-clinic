import { Injectable } from '@nestjs/common';
import { ProvinceEntity } from 'src/infrastructure/typeorm/province.orm-entity';
import { EntityManager } from 'typeorm';

@Injectable()
export class ProvincesSeeder {
    constructor() { }

    async seed(manager: EntityManager) {
        const _respository = manager.getRepository(ProvinceEntity);
        const items = [
            { id: 1, name: 'ນະຄອນຫລວງວຽງຈັນ', name_en: 'Vientiane capital' },
            { id: 2, name: 'ຜົ້ງສາລີ', name_en: 'Phongsali' },
            { id: 3, name: 'ຫລວງນ້ຳທາ', name_en: 'Louang Namtha' },
            { id: 4, name: 'ອຸດົມໄຊ', name_en: 'Oudomxai' },
            { id: 5, name: 'ບໍ່ແກ້ວ', name_en: 'Bokeo' },
            { id: 6, name: 'ຫຼວງພະບາງ', name_en: 'Louang Phabang' },
            { id: 7, name: 'ຫົວພັນ', name_en: 'Houaphan' },
            { id: 8, name: 'ໄຊຍະບູລີ', name_en: 'Xaignabouli' },
            { id: 9, name: 'ຊຽງຂວາງ', name_en: 'Xiangkhoang' },
            { id: 10, name: 'ວຽງຈັນ', name_en: 'Vientiane' },
            { id: 11, name: 'ບໍລິຄຳໄຊ', name_en: 'Boli khamxai' },
            { id: 12, name: 'ຄຳມ່ວນ', name_en: 'Khammouan' },
            { id: 13, name: 'ສະຫວັນນະເຂດ', name_en: 'Savannakhet' },
            { id: 14, name: 'ສາລະວັນ', name_en: 'Salavan' },
            { id: 15, name: 'ເຊກອງ', name_en: 'Xekong' },
            { id: 16, name: 'ຈຳປາສັກ', name_en: 'Champasak' },
            { id: 17, name: 'ອັດຕະປື', name_en: 'Attapu' },
            { id: 18, name: 'ໄຊສົມບູນ', name_en: 'Sisomboun' }
        ]
        for (const item of items) {
            const items = _respository.create(item);
            await _respository.save(items);
            // console.log(`✅ Created Province: ${item.name}`);
        }
        console.log('🎉 Province seeding complete.');
    }
}
