import { Controller, Get, Query } from '@nestjs/common';
import { VerifyEmail } from '../application/use-cases/verifyEmail';
import { Public } from 'src/shared/decorators/auth.decorator';
import { SendMail } from '../application/use-cases/sendMail';

@Controller('mail')
export class MailController {
  constructor(
    private readonly sendMail: SendMail,
    private verifyEmailUseCase: VerifyEmail,
  ) {}
  @Public()
  @Get('verify')
  async verifyEmail(
    @Query('token') token: string,
  ): Promise<{ message: string }> {
    return await this.verifyEmailUseCase.execute(token);
  }
@Public()
@Get('test')
async testSendMail() {
    


  const to = "uablauj@gmail.com"; // fallback ถ้าไม่มีส่งมา
  console.log('Sending email to:', to);

  await this.sendMail.execute(
    to,
    'Bienvenido a la plataforma',
    'welcome',
    {
      name: 'Tester',
      url: 'http://localhost:3000/verify/test-token',
    },
  );

  console.log('Email should be sent');
  return { message: 'Email sent (check your inbox)' };
}
}