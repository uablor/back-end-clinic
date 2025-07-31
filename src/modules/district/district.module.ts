import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DistrictEntity } from "src/infrastructure/typeorm/district.orm-entity";
import { DistrictController } from "./controller/district.controller";
import { DistrictRepositoryOrm } from "./infrastructure/district.repository.orm";
import { GetAllDistrictUseCase } from "./application/query/get-all-district.use-case";


@Module({
    imports: [TypeOrmModule.forFeature([DistrictEntity])],
    controllers: [DistrictController],
    providers: [
        {
            provide: 'DistrictRepository',
            useClass: DistrictRepositoryOrm
        },
        GetAllDistrictUseCase
    ],
    exports: [
        {
            provide: 'DistrictRepository',
            useClass: DistrictRepositoryOrm
        }
    ]
})
export class DistrictModule {}