import * as dotenv from 'dotenv';
dotenv.config();
import { NestFactory } from '@nestjs/core';
import { TypeOrmRepositoryModule } from '../typeOrm.module';
import { SeederService } from './seed.service';

async function bootstrap() {
    const app = await NestFactory.createApplicationContext(
        TypeOrmRepositoryModule,
    );
    const seeder = app.get(SeederService);

    try {
        await seeder.seed();
    } catch (error) {
        console.log('error for notification seeder', error);
    }
    await app.close();
}

bootstrap().catch((error) => console.log('rrror seeding database: ', error));
