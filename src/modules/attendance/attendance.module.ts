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
import { AttendanceController } from './controller/attendance.controller';
import { AttendanceRepositoryOrm } from './infrastructure/attendance.repository.orm';
import { CreateAttendanceUseCase } from './application/use-cases/command/create-attendance.use-case';
import { AttendanceEntity } from 'src/infrastructure/typeorm/attendance.orm-entity';
import { ClinicModule } from '../clinic/clinic.module';
import { ClinicEntity } from 'src/infrastructure/typeorm/clinic.orm-entity';
import { AuthModule } from '../auth/auth.module';
import { GetAllAttendanceUseCase } from './application/use-cases/query/get-all-attendance.use-case';
import { GetOneAttendanceUseCase } from './application/use-cases/query/get-one-attendance.use-case';
import { UpdateAttendanceUseCase } from './application/use-cases/command/update-attendance.use-case';
import { RestoreAttendanceUseCase } from './application/use-cases/command/restore-attendance.use-case';
import { HardDeleteAttendanceUseCase } from './application/use-cases/command/hard-delete-attendance.use-case';
import { SoftDeleteAttendanceUseCase } from './application/use-cases/command/soft-delete-attendance.use-case';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AttendanceEntity,
      UserEntity,
      DistrictEntity,
      ClinicEntity,
    ]),
    TransactionModule,
    DistrictModule,
    UserModule,
    MailModule,
    ClinicModule,
    AuthModule,
  ],
  controllers: [AttendanceController],
  providers: [
    {
      provide: 'AttendanceRepository',
      useClass: AttendanceRepositoryOrm,
    },
    {
      provide: TRANSACTION_MANAGER_SERVICE,
      useClass: TransactionManagerService,
    },
    {
      provide: 'UserRepository',
      useClass: UserRepositoryOrm,
    },
    CreateAttendanceUseCase,
    GetAllAttendanceUseCase,
    GetOneAttendanceUseCase,
    UpdateAttendanceUseCase,
    RestoreAttendanceUseCase,
    HardDeleteAttendanceUseCase,
    SoftDeleteAttendanceUseCase,
  ],
  exports: [
    {
      provide: 'AttendanceRepository',
      useClass: AttendanceRepositoryOrm,
    },
    CreateAttendanceUseCase,
    GetAllAttendanceUseCase,
    GetOneAttendanceUseCase,
    UpdateAttendanceUseCase,
    RestoreAttendanceUseCase,
    HardDeleteAttendanceUseCase,
    SoftDeleteAttendanceUseCase,
  ],
})
export class AttendanceModule {}
