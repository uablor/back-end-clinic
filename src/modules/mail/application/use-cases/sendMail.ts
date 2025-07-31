import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";

@Injectable()
export class SendMail {
    constructor(
        private readonly mailService: MailerService
    ) {}

    async execute(to: string, subject: string, text: string, html: string): Promise<void> {
        await this.mailService.sendMail({
            to,
            subject,
            text,
            html
        })
    }
}