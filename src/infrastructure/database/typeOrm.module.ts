import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { UsersSeeder } from './seeders/seeds/seed-users';
import { SeederService } from './seeders/seed.service';
import { TransactionModule } from 'src/infrastructure/transaction/transaction.module';
import { ProvincesSeeder } from './seeders/seeds/seed-provincs';
import { DistrictsSeeder } from './seeders/seeds/seed-districts';
import { PermissionSeeder } from './seeders/seeds/seed-permission';
import { RolesSeeder } from './seeders/seeds/seed-roles';

@Module({
    imports: [
        ConfigModule,
        TransactionModule,
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                type: 'mysql',
                host: configService.getOrThrow('DB_HOST'),
                port: configService.getOrThrow('DB_PORT'),
                username: configService.getOrThrow('DB_USERNAME'),
                password: configService.getOrThrow('DB_PASSWORD'),
                database: configService.getOrThrow('DB_NAME'),
                entities: [join(__dirname, '..', 'typeorm', '**', '*.orm-entity.{js,ts}')],
                synchronize: configService.getOrThrow('DB_SYNCHRONIZE') === 'true',
                logging: configService.getOrThrow('DB_LOGGING') === 'true',
                migrationsTableName: 'migrations',
            }),
        })
    ],
    providers: [UsersSeeder, SeederService, ProvincesSeeder, DistrictsSeeder, PermissionSeeder, RolesSeeder]
})
export class TypeOrmRepositoryModule { }