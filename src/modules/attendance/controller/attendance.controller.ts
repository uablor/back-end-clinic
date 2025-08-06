import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Request,
} from '@nestjs/common';
import { CurrentUser } from 'src/shared/decorators/user.decorator';
import { Public } from 'src/shared/decorators/auth.decorator';
import { CreateAttendanceDto } from '../application/dto/create-attendance.dto';
import { CreateAttendanceUseCase } from '../application/use-cases/command/create-attendance.use-case';
import { Attendance } from '../domain/attendance';
import { ProfiledDto } from 'src/shared/dto/profile.dto';
import { PaginationDto } from 'src/shared/dto/paginationDto';
import { PaginatedResponse } from 'src/shared/interface/pagination-response';
import { AttendanceResponse } from '../interface/attendance.interface';
import { AttendanceMapper } from '../mapper/attendance.mapper';
import { RestoreAttendanceUseCase } from '../application/use-cases/command/restore-attendance.use-case';
import { UpdateAttendanceUseCase } from '../application/use-cases/command/update-attendance.use-case';
import { HardDeleteAttendanceUseCase } from '../application/use-cases/command/hard-delete-attendance.use-case';
import { SoftDeleteAttendanceUseCase } from '../application/use-cases/command/soft-delete-attendance.use-case';
import { GetOneAttendanceUseCase } from '../application/use-cases/query/get-one-attendance.use-case';
import { GetAllAttendanceUseCase } from '../application/use-cases/query/get-all-attendance.use-case';
import { UpdateAttendanceDto } from '../application/dto/update-attendance.dto';
import { UseAutoPermissions } from 'src/shared/decorators/permissions.decorator';

@Controller('attendance')
@UseAutoPermissions()
export class AttendanceController {
  constructor(
    private readonly createAttendUseCase: CreateAttendanceUseCase,
    private readonly udateAttendUseCase: UpdateAttendanceUseCase,
    private readonly harddeleteAttendUseCase: HardDeleteAttendanceUseCase,
    private readonly findOneAttendUseCase: GetOneAttendanceUseCase,
    private readonly findAllAttendUseCase: GetAllAttendanceUseCase,
    private readonly sortdeleteAttendUseCase: SoftDeleteAttendanceUseCase,
    private readonly restoreAttendUseCase: RestoreAttendanceUseCase,
  ) {}

  @Post()
  async create(
    @Body() dto: CreateAttendanceDto,
    @CurrentUser() user: ProfiledDto,
  ): Promise<Attendance> {
    return this.createAttendUseCase.execute(dto, user.sub);
  }

  //    @Permissions('get_all_user')
  @Get()
  async getAll(
    @Query() query: PaginationDto,
  ): Promise<PaginatedResponse<AttendanceResponse>> {
    const attendance = await this.findAllAttendUseCase.execute(query);
    return AttendanceMapper.toResponseList(attendance.data, attendance.pagination);
  }

  //    @Permissions('get_one_user')
  @Get(':id')
  async getOne(@Param('id') id: number): Promise<AttendanceResponse> {
    return AttendanceMapper.toResponse(await this.findOneAttendUseCase.execute(id));
  }

  //    @Permissions('update_user')
  @Patch(':id')
  async update(@Param('id') id: number, @Body() dto: UpdateAttendanceDto, @CurrentUser() user: ProfiledDto) {
    return await this.udateAttendUseCase.execute( id, user.sub,dto, );
  }

  //    @Permissions('hard_delete_user')
  @Delete('hard/:id')
  async hardDelete(@Param('id') id: number): Promise<{ message: string }> {
    return await this.harddeleteAttendUseCase.execute(id);
  }

  //    @Permissions('soft_delete_user')
  @Delete('soft/:id')
  async softDelete(@Param('id') id: number) {
    return await this.sortdeleteAttendUseCase.execute(id);
  }

  //    @Permissions('restore_user')
  @Patch('restore/:id')
  async restore(@Param('id') id: number) {
    return await this.restoreAttendUseCase.execute(id);
  }
}
