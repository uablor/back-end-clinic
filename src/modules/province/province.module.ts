import { Module } from "@nestjs/common";
import { ProvinceController } from "./controller/province.controller";
import { ProvinceRepositoryOrm } from "./infrastructure/province.repository.orm";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProvinceEntity } from "src/infrastructure/typeorm/province.orm-entity";
import { GetAllProvinceUseCase } from "./application/use-cases/query/get-all-province.use-case";

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