
import { DistrictEntity } from "src/infrastructure/typeorm/district.orm-entity";
import { District } from "../domain/district";

export class DistrictMapper {
    static toDomain(entity: DistrictEntity): District {
        return new District({
            id: entity.id,
            name: entity.name,
            name_en: entity.name_en,
            province: entity.province
        });
    }

    static toOrm(domain: District): DistrictEntity {
        const entity = new DistrictEntity();
        if (domain.id !== undefined) entity.id = domain.id;
        entity.name = domain.name;
        entity.name_en = domain.name_en;
        return entity;
    }
}

