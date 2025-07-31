import { MailerModule } from "@nestjs-modules/mailer";
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { SendMail } from "./application/use-cases/sendMail";
import { VerifyEmail } from "./application/use-cases/verifyEmail";
import { UserModule } from "../user/user.module";
import { AuthModule } from "../auth/auth.module";
import { MailController } from "./controller/mail.controller";

@Module({
    imports: [
        AuthModule,
        UserModule,
        MailerModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (config) => ({
                global: true,
                transport: {
                    host: config.getOrThrow('SMTP_HOST'),
                    port: config.getOrThrow('SMTP_PORT'),
                    secure: config.getOrThrow('SMTP_SECURE') === 'true',
                    auth: {
                        user: config.getOrThrow('SMTP_USER'),
                        pass: config.getOrThrow('SMTP_PASSWORD')
                    }
                },
                defaults: {
                    from: config.getOrThrow('SMTP_FROM')
                }
            })
        })
    ],
    controllers: [MailController],
    providers: [SendMail,VerifyEmail],
    exports: [SendMail,VerifyEmail]
})
export class MailModule { }