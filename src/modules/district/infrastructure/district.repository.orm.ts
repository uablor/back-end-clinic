import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DistrictEntity } from "src/infrastructure/typeorm/district.orm-entity";
import { Repository } from "typeorm";
import { DistrictRepository } from "../domain/district.repository";
import { DistrictMapper } from "../mapper/district.mapper";
import { District } from "../domain/district";

@Injectable()
export class DistrictRepositoryOrm implements DistrictRepository{
    constructor(
        @InjectRepository(DistrictEntity)
        private readonly districtRepository: Repository<DistrictEntity>,
    ){}

    async getAll(id: number): Promise<District[]> {
        const entities = await this.districtRepository.find({
            relations: ['province'],where: { province: { id: id } }
        });
        return entities.map(entity => DistrictMapper.toDomain(entity));
    }

    async findOne(id: number): Promise<District | null> {
        const entity = await this.districtRepository.findOne({ where: { id: id }, relations: ['province'] });
        return entity ? DistrictMapper.toDomain(entity) : null;
    }
}