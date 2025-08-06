import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { CreateUserDto } from '../application/dto/create-user.dto';
import { CreateUserUseCase } from '../application/use-cases/command/create-user.use-case';
import { PaginationDto } from 'src/shared/dto/paginationDto';
import { PaginatedResponse } from 'src/shared/interface/pagination-response';
import { GetAllUserUseCase } from '../application/use-cases/query/get-all-user.use-case';
import { UserResponse } from '../interface/user.interface';
import { UserMapper } from '../mapper/user.mapper';
import { GetOneUserUseCase } from '../application/use-cases/query/get-one-user.use-case';
import { GetUserByEmailUseCase } from '../application/use-cases/query/get-email-user.use-case';
import { HardDeleteUserUseCase } from '../application/use-cases/command/hard-delete-user.use-case';
import { SoftDeleteUserUseCase } from '../application/use-cases/command/soft-delete-user.use-case';
import { RestoreUserUseCase } from '../application/use-cases/command/restore-user.use-case';
import { UpdateUserDto } from '../application/dto/update-user.dto';
import { UpdateUserUseCase } from '../application/use-cases/command/update-user.use-case';
import { Permissions, UseAutoPermissions } from 'src/shared/decorators/permissions.decorator';
import { UploadAvatarUserUseCase } from '../application/use-cases/command/uploadavatar-use-case';
import { customUploadInterceptor } from 'src/shared/interceptors/avatarUpload.interceptor';

@Controller('user')
@UseAutoPermissions()
export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly getAllUserUseCase: GetAllUserUseCase,
    private readonly getUserByEmailUseCase: GetUserByEmailUseCase,
    private readonly getOneUserUseCase: GetOneUserUseCase,
    private readonly hardDeleteUserUseCase: HardDeleteUserUseCase,
    private readonly softDeleteUserUseCase: SoftDeleteUserUseCase,
    private readonly restoreUserUseCase: RestoreUserUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
    private readonly udloadAvatarUserUseCase: UploadAvatarUserUseCase,
  ) {}

  // @Permissions('get_all_user')
  @Get()
  async getAllUser(
    @Query() query: PaginationDto,
  ): Promise<PaginatedResponse<UserResponse>> {
    const users = await this.getAllUserUseCase.execute(query);
    return UserMapper.toResponseList(users.data, users.pagination);
  }

  @Post('upload-avatar/:id')
  @UseInterceptors(customUploadInterceptor('avatars'))
  async uploadAvatar(
    @UploadedFile() file: Express.Multer.File,
    @Param("id") id: number,
  ): Promise< string | null> {

    return await this.udloadAvatarUserUseCase.execute(id, file);
  }

  // @Permissions('get_email_user')
  @Get('email')
  async getByEmail(@Query('email') email: string): Promise<UserResponse> {
    return UserMapper.toResponse(
      await this.getUserByEmailUseCase.execute(email),
    );
  }

  // @Permissions('get_one_user')
  @Get(':id')
  async getOneUser(@Param('id') id: number): Promise<UserResponse> {
    return UserMapper.toResponse(await this.getOneUserUseCase.execute(id));
  }

  // @Permissions('create_user')
  @Post()
  async createUser(@Body() dto: CreateUserDto) {
    const user = await this.createUserUseCase.execute(dto);
    return user;
  }

  // @Permissions('update_user')
  @Patch(':id')
  async updateUser(@Param('id') id: number, @Body() dto: UpdateUserDto) {
    return await this.updateUserUseCase.execute(id, dto);
  }

  // @Permissions('hard_delete_user')
  @Delete('hard/:id')
  async hardDeleteUser(@Param('id') id: number): Promise<{ message: string }> {
    return await this.hardDeleteUserUseCase.execute(id);
  }

  // @Permissions('soft_delete_user')
  @Delete('soft/:id')
  async softDeleteUser(@Param('id') id: number) {
    return await this.softDeleteUserUseCase.execute(id);
  }

  // @Permissions('restore_user')
  @Patch('restore/:id')
  async restoreUser(@Param('id') id: number) {
    return await this.restoreUserUseCase.execute(id);
  }
}
