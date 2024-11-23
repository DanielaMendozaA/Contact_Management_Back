import { Module } from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { ContactsController } from './contacts.controller';
import { Contact } from './entities/contact.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Contact]),
    UsersModule
  ],
  controllers: [ContactsController],
  providers: [{
    provide: 'IContactService',
    useClass: ContactsService
  }],
  exports: [
    'IContactService',
    TypeOrmModule

  ]
})
export class ContactsModule {}
