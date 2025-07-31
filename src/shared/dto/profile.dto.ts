import { IsEmail, IsNotEmpty, IsArray, IsString } from 'class-validator';

export class ProfiledDto {
    @IsNotEmpty()
    sub: number;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsArray()
    @IsString({ each: true })
    permissions: string[];
}

