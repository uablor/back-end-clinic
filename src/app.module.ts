import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmRepositoryModule } from './infrastructure/database/typeOrm.module';
import { APP_GUARD } from '@nestjs/core';
import { TransactionModule } from './infrastructure/transaction/transaction.module';
import { UserModule } from './modules/user/user.module';
import { ProvinceModule } from './modules/province/province.module';
import { DistrictModule } from './modules/district/district.module';
import { AuthModule } from './modules/auth/auth.module';
import { PermissionsGuard } from './shared/guards/permissions.guard';
import { JwtAuthGuard } from './shared/guards/jwt.guard';
import { MailModule } from './modules/mail/mail.module';
import { RoleModule } from './modules/role/role.module';
import { EmployeeEducationModule } from './modules/employee_education/employee_education.module';
import { PermissionModule } from './modules/permission/permission.module';
import { EmployeeModule } from './modules/employee/employee.module';
import { ClinicModule } from './modules/clinic/clinic.module';
import { AttendanceModule } from './modules/attendance/attendance.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmRepositoryModule,
    TransactionModule,
    UserModule,
    DistrictModule,
    AuthModule,
    ProvinceModule,
    RoleModule,
    MailModule,
    EmployeeEducationModule,
    EmployeeModule,
    PermissionModule,
    ClinicModule,
    AttendanceModule
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: PermissionsGuard,
    },
  ],
})
export class AppModule { }
