import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, Query } from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { ApiExtraModels, ApiTags } from '@nestjs/swagger';
import { GetContactResponseDto } from './dto/get-contact-response.dto';
import { IContactService } from './interfaces/contact-service.interface';
import { ApiDocCreateContact, ApiDocDeleteContact, ApiDocEditContact, ApiDocGetAllContacts, ApiDocGetContactById } from './decorators/contact-swagger.decorator';
import { CreateContactDto } from './dto/create-contact.dto';
import { DeleteResult, UpdateResult } from 'typeorm';
import { UpdateContactDto } from './dto/update-contact.dto';
import { QueryDto } from './dto/query-contact.dto';

@ApiTags("Contacts")
@ApiExtraModels(GetContactResponseDto)
@Controller('contacts')
export class ContactsController {
  constructor(
    @Inject('IContactService')
    private readonly contactsService: IContactService
  ) {}

  @ApiDocGetAllContacts(GetContactResponseDto)
  @Get()
  getAllWithQuery(@Query() queryDto: QueryDto){
    return this.contactsService.findAllWithQuery(queryDto)
  }

  @ApiDocCreateContact(GetContactResponseDto)
  @Post()
  create(@Body() createContactDto: CreateContactDto){
    return this.contactsService.createContact(createContactDto)
  }

  @ApiDocEditContact(UpdateResult)
  @Patch(':id')
  update(@Body() updateContactDto: UpdateContactDto, @Param('id') id: string){
    return this.contactsService.editContact(+id, updateContactDto)
  }

  @ApiDocDeleteContact(DeleteResult)
  @Delete(':id')
  delete( @Param('id') id: string){
    return this.contactsService.deleteContact(+id)
  }
  
  @ApiDocGetContactById(GetContactResponseDto)
  @Get(':id')
  getOneById( @Param('id') id: string ){
    return this.contactsService.getOneById(+id)
  }


}
