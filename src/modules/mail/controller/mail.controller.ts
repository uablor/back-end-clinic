import { Controller, Get, Query } from "@nestjs/common";
import { VerifyEmail } from "../application/use-cases/verifyEmail";
import { Public } from "src/shared/decorators/auth.decorator";

@Controller('mail')
export class MailController {
    constructor(
        private verifyEmailUseCase: VerifyEmail
    ){}
    @Public()
    @Get('/verify-email')
    async verifyEmail(@Query('token') token: string): Promise<{message:string}> {
        return await this.verifyEmailUseCase.execute(token);
    }
}