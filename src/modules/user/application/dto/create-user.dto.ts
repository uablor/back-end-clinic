import { IsArray, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, IsStrongPassword } from "class-validator";

export class CreateUserDto{

    @IsNotEmpty()
    @IsString()
    username: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsStrongPassword({
        minLength: 6,
        minLowercase: 0,
        minUppercase: 0,
        minNumbers: 0,
        minSymbols: 0
    })
    @IsNotEmpty()
    password: string;

    @IsArray()
    @IsOptional()
    roles: number[]

    @IsArray()
    @IsOptional()
    permissions: number[]

    @IsNotEmpty()
    @IsNumber()
    clinic: number;

}