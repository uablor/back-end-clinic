import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeEntity } from 'src/infrastructure/typeorm/employee.orm-entity';
import { EmployeeController } from './controller/employee.controller';
import { EmployeeRepositoryOrm } from './infrastructure/employee.repository.orm';
import { CreateEmployeeUseCase } from './application/use-cases/command/create-employee.use-case';
import { TRANSACTION_MANAGER_SERVICE } from 'src/shared/constants/inject-key';
import { TransactionManagerService } from 'src/infrastructure/transaction/transaction.service';
import { UserEntity } from 'src/infrastructure/typeorm/user.orm-entity';
import { TransactionModule } from 'src/infrastructure/transaction/transaction.module';
import { UserModule } from '../user/user.module';
import { UserRepositoryOrm } from '../user/infrastructure/user.repository.orm';
import { GetOneEmployeeUseCase } from './application/use-cases/query/get-one-employee.use-case';
import { GetAllEmployeeUseCase } from './application/use-cases/query/get-all-employee.use-case';
import { UpdateEmployeeUseCase } from './application/use-cases/command/update-employee.use-case';
import { DistrictModule } from '../district/district.module';
import { DistrictEntity } from 'src/infrastructure/typeorm/district.orm-entity';
import { HardDeleteEmployeeUseCase } from './application/use-cases/command/hard-delete-employee.use-case';
import { SoftDeleteEmployeeUseCase } from './application/use-cases/command/soft-delete-employee.use-case';
import { RestoreEmployeeUseCase } from './application/use-cases/command/restore-employee.use-case';
import { MailModule } from '../mail/mail.module';
import { AuthModule } from '../auth/auth.module';
import { ClinicModule } from '../clinic/clinic.module';

@Module({
  imports: [

    TypeOrmModule.forFeature([EmployeeEntity, UserEntity]),
    TransactionModule,
    DistrictModule,
    forwardRef(() => UserModule),
    forwardRef(() => AuthModule),
    forwardRef(() => MailModule),
    ClinicModule,
  ],
  controllers: [EmployeeController],
  providers: [
    {
      provide: 'EmployeeRepository',
      useClass: EmployeeRepositoryOrm,
    },
    {
      provide: TRANSACTION_MANAGER_SERVICE,
      useClass: TransactionManagerService,
    },
    {
      provide: 'UserRepository',
      useClass: UserRepositoryOrm,
    },
    CreateEmployeeUseCase,
    GetOneEmployeeUseCase,
    GetAllEmployeeUseCase,
    HardDeleteEmployeeUseCase,
    SoftDeleteEmployeeUseCase,
    RestoreEmployeeUseCase,
    UpdateEmployeeUseCase,
  ],
  exports: [
    {
      provide: 'EmployeeRepository',
      useClass: EmployeeRepositoryOrm,
    },
    CreateEmployeeUseCase,
    UpdateEmployeeUseCase,
    SoftDeleteEmployeeUseCase,
    HardDeleteEmployeeUseCase,
    RestoreEmployeeUseCase,
    GetOneEmployeeUseCase,
    GetAllEmployeeUseCase,
  ],
})
export class EmployeeModule {}
