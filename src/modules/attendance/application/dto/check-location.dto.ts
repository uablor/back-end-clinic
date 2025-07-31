import { IsNumber, IsUUID } from 'class-validator'

export class CheckLocationDto {
  @IsNumber()
  latitude: number

  @IsNumber()
  longitude: number

  @IsNumber()
  accuracy: number

  @IsUUID()
  clinicId: string
}
