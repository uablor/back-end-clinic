import { ProvinceEntity } from "src/infrastructure/typeorm/province.orm-entity";
import { Province } from "../domain/province";

export class ProvinceMapper {
    static toDomain(entity: ProvinceEntity): Province {
        return new Province({
            id: entity.id,
            name: entity.name,
            name_en: entity.name_en
        });
    }
}

