import { Module } from "@nestjs/common";
import { ProvinceController } from "./controller/province.controller";
import { GetAllProvinceUseCase } from "./application/query/get-all-province.use-case";
import { ProvinceRepositoryOrm } from "./infrastructure/province.repository.orm";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProvinceEntity } from "src/infrastructure/typeorm/province.orm-entity";

@Module({
    imports: [TypeOrmModule.forFeature([ProvinceEntity])],
    controllers: [ProvinceController],
    providers: [
        {
            provide: 'ProvinceRepository',
            useClass: ProvinceRepositoryOrm
        },
        GetAllProvinceUseCase
    ],
    exports: []
})
export class ProvinceModule {}