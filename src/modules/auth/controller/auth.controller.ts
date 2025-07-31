import { Body, Controller, Get, Post } from "@nestjs/common";
import { LoginUseCase } from "../application/use-cases/command/login.use-case";
import { LoginDto } from "../application/dto/create-auth.dto";
import { CurrentUser } from "src/shared/decorators/user.decorator";
import { Public } from "src/shared/decorators/auth.decorator";

@Controller('auth')
export class AuthController {
    constructor(
        private readonly loginUseCase: LoginUseCase
    ){}
    @Public()
    @Post('login')
    async login(@Body() dto: LoginDto): Promise<{ accessToken: string }> {
        return this.loginUseCase.execute(dto);
    }

    @Get('profile')
    async profile(@CurrentUser() user: any) {
        return user
    }
}