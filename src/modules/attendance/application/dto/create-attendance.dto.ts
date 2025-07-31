import { IsDateString, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { AttendanceStatus } from 'src/infrastructure/typeorm/attendance.orm-entity';


export class CreateAttendanceDto {
  @IsDateString()
  @IsOptional()
  date: Date;

  @IsOptional()
  @IsString()
  check_in_time: string;

  @IsOptional()
  @IsString()
  check_out_time?: string;

  @IsNotEmpty()
  @IsNumber()
  latitude: number;

  @IsNotEmpty()
  @IsNumber()
  longitude: number;

  @IsNumber()
  @IsOptional()
  accuracy?: number;

  @IsOptional()
  @IsEnum(AttendanceStatus)
  status?: AttendanceStatus;

  @IsOptional()
  @IsString()
  note?: string;

  @IsNumber()
  @IsOptional()
  clinicId: number;
}
