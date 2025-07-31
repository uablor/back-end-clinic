import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateClinicDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  latitude: number;

  @IsNumber()
  @IsNotEmpty()
  longitude: number;

  @IsNumber()
  @IsNotEmpty()
  radius: number;

  @IsString()
  @IsNotEmpty()
  start_time_work: string;

  @IsString()
  @IsNotEmpty()
  end_time_work: string;

  @IsNumber()
  @IsNotEmpty()
  late_threshold_minutes: number;
}
