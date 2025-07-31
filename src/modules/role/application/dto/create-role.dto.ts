import { IsArray, IsNotEmpty, IsString } from "class-validator";

export class CreateRoleDto {
    @IsString()
    @IsNotEmpty()
    name: string;
    @IsString()
    @IsNotEmpty()
    display_name: string;
    @IsArray()
    @IsNotEmpty()
    permissions: number[]
}