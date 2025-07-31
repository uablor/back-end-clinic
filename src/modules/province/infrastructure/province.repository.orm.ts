import { Injectable } from "@nestjs/common";
import { ProvinceRepository } from "../domain/province.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { ProvinceEntity } from "src/infrastructure/typeorm/province.orm-entity";
import { Repository } from "typeorm";
import { Province } from "../domain/province";
import { ProvinceMapper } from "../mapper/province.mapper";

@Injectable()
export class ProvinceRepositoryOrm implements ProvinceRepository{
    constructor(
        @InjectRepository(ProvinceEntity)
        private readonly provinceRepository: Repository<ProvinceEntity>,
    ){}
    async getAll(id: number): Promise<Province[]> {
        const entities = await this.provinceRepository.find({where: { districts: { id: id } }});
        return entities.map(entity => ProvinceMapper.toDomain(entity));
    }
}