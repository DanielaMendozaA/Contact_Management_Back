import { Logger, Module, OnModuleInit } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { CacheModule } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-ioredis';

import { TypeOrmModule } from '@nestjs/typeorm';
import { JoiValidation } from './common/config/joi-validation.config';

import { CommonModule } from './common/common.module';
import { DatabaseConfigService } from './common/config/db-config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ContactsModule } from './contacts/contacts.module';
import { SeederRunner } from './seeders/runSeeders.seeder';
import { ContactsSeeder } from './seeders/contact.seeder';
import { CloudinaryModule } from './upload/cloudinary.module';



@Module({
  imports: [
    CacheModule.register({
      isGlobal: true,
      store: redisStore,
      host: process.env.REDIS_HOST || 'localhost',
      port: parseInt(process.env.REDIS_PORT, 10) || 6379,
      ttl: 0,
    }),
    ConfigModule.forRoot({
      validationSchema: JoiValidation,
      isGlobal: true,
      envFilePath: '.env'
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: DatabaseConfigService

    }),
    CommonModule,
    AuthModule,
    UsersModule,
    ContactsModule,
    CloudinaryModule],
    
  providers: [
    SeederRunner,
    ContactsSeeder
  ],
})
export class AppModule implements OnModuleInit {
  constructor(
    private readonly seederRunner: SeederRunner,
    private configService: ConfigService
  ) { }

  async onModuleInit() {
    Logger.log('AppModule initialized. Seeding database...');
    const executedSeeders = this.configService.get<string>('EXECUTE_SEEDS');
    console.log('executedSeeders', executedSeeders);

    if (executedSeeders) {
      Logger.log('Executing seeders...');
      await this.seederRunner.runSeeds();
    } else {
      Logger.log('Seeders execution skipped.');
    }


  }

}
