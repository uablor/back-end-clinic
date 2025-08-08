import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SendMail {
  constructor(private readonly mailService: MailerService) {}

  async execute(
    to: string,
    subject: string,
    template: string,
    context: Record<string, any>,
  ): Promise<void> {
    await this.mailService.sendMail({
      to,
      subject,
      template, // เช่น 'welcome' (ตรงกับชื่อไฟล์ welcome.hbs)
      context, // เช่น { name: 'Juan', url: 'http://localhost:3000/verify/123' }
    });
  }
}
