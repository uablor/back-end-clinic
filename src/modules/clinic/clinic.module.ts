import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TRANSACTION_MANAGER_SERVICE } from 'src/shared/constants/inject-key';
import { TransactionManagerService } from 'src/infrastructure/transaction/transaction.service';
import { UserEntity } from 'src/infrastructure/typeorm/user.orm-entity';
import { TransactionModule } from 'src/infrastructure/transaction/transaction.module';
import { UserModule } from '../user/user.module';
import { UserRepositoryOrm } from '../user/infrastructure/user.repository.orm';
import { DistrictModule } from '../district/district.module';
import { DistrictEntity } from 'src/infrastructure/typeorm/district.orm-entity';
import { MailModule } from '../mail/mail.module';
import { AuthModule } from '../auth/auth.module';
import { ClinicEntity } from 'src/infrastructure/typeorm/clinic.orm-entity';
import { ClinicController } from './controller/clinic.controller';
import { ClinicRepositoryOrm } from './infrastructure/clinic.repository.orm';
import { CreateClinicUseCase } from './application/use-cases/command/create-clinic.use-case';
import { GetOneClinicUseCase } from './application/use-cases/query/get-one-clinic.use-case';
import { GetAllClinicUseCase } from './application/use-cases/query/get-all-clinic.use-case';
import { HardDeleteClinicUseCase } from './application/use-cases/command/hard-delete-clinic.use-case';
import { SoftDeleteClinicUseCase } from './application/use-cases/command/soft-delete-clinic.use-case';
import { RestoreClinicUseCase } from './application/use-cases/command/restore-clinic.use-case';
import { UpdateClinicUseCase } from './application/use-cases/command/update-clinic.use-case';

@Module({
  imports: [
    TypeOrmModule.forFeature([ClinicEntity]),
    TransactionModule,
  ],
  controllers: [ClinicController],
  providers: [
    {
      provide: 'ClinicRepository',
      useClass: ClinicRepositoryOrm,
    },
    GetOneClinicUseCase,
    GetAllClinicUseCase,
    CreateClinicUseCase,
    HardDeleteClinicUseCase,
    SoftDeleteClinicUseCase,
    RestoreClinicUseCase,
    UpdateClinicUseCase,
  ],
  exports: [
    {
      provide: 'ClinicRepository',
      useClass: ClinicRepositoryOrm,
    },
    GetOneClinicUseCase,
    GetAllClinicUseCase,
    CreateClinicUseCase,
    HardDeleteClinicUseCase,
    SoftDeleteClinicUseCase,
    RestoreClinicUseCase,
    UpdateClinicUseCase,
  ],
})
export class ClinicModule {}
