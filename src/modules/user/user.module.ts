import { Module } from '@nestjs/common';
import { UserController } from './controller/user.controller';
import { UserRepositoryOrm } from './infrastructure/user.repository.orm';
import { CreateUserUseCase } from './application/use-cases/command/create-user.use-case';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/infrastructure/typeorm/user.orm-entity';
import { GetAllUserUseCase } from './application/use-cases/query/get-all-user.use-case';
import { GetOneUserUseCase } from './application/use-cases/query/get-one-user.use-case';
import { GetUserByEmailUseCase } from './application/use-cases/query/get-email-user.use-case';
import { HardDeleteUserUseCase } from './application/use-cases/command/hard-delete-user.use-case';
import { SoftDeleteUserUseCase } from './application/use-cases/command/soft-delete-user.use-case';
import { RestoreUserUseCase } from './application/use-cases/command/restore-user.use-case';
import { UpdateUserUseCase } from './application/use-cases/command/update-user.use-case';
import { ClinicModule } from '../clinic/clinic.module';
import { UploadAvatarUserUseCase } from './application/use-cases/command/uploadavatar-use-case';


@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), ClinicModule],
  controllers: [UserController],
  providers: [
    {
      provide: 'UserRepository',
      useClass: UserRepositoryOrm,
    },
    CreateUserUseCase,
    GetOneUserUseCase,
    GetUserByEmailUseCase,
    GetAllUserUseCase,
    HardDeleteUserUseCase,
    SoftDeleteUserUseCase,
    RestoreUserUseCase,
    UpdateUserUseCase,
    UploadAvatarUserUseCase,
  ],
  exports: [
    GetUserByEmailUseCase,
    GetOneUserUseCase,
    CreateUserUseCase,
    UploadAvatarUserUseCase,
    {
      provide: 'UserRepository',
      useClass: UserRepositoryOrm,
    },
  ],
})
export class UserModule {}
