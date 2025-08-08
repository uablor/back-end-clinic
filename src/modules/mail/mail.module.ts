import { MailerModule } from '@nestjs-modules/mailer';
import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SendMail } from './application/use-cases/sendMail';
import { VerifyEmail } from './application/use-cases/verifyEmail';
import { UserModule } from '../user/user.module';
import { AuthModule } from '../auth/auth.module';
import { MailController } from './controller/mail.controller';
import { join } from 'path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    forwardRef(() => UserModule),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        global: true,
        transport: {
          host: config.getOrThrow('SMTP_HOST'),
          port: config.getOrThrow('SMTP_PORT'),
          secure: config.getOrThrow('SMTP_SECURE') === 'true',
          auth: {
            user: config.getOrThrow('SMTP_USER'),
            pass: config.getOrThrow('SMTP_PASSWORD'),
          },
        },
        defaults: {
          from: config.getOrThrow('SMTP_FROM'),
        },
        template: {
          dir: join(process.cwd(), 'src', 'templates'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
    }),
  ],
  controllers: [MailController],
  providers: [SendMail, VerifyEmail],
  exports: [SendMail, VerifyEmail],
})
export class MailModule {}
