import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { IContactService } from './interfaces/contact-service.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Contact } from './entities/contact.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { QueryDto } from './dto/query-contact.dto';

@Injectable()
export class ContactsService implements IContactService, OnModuleInit {
    constructor(
        @InjectRepository(Contact)
        private readonly contactRepository: Repository<Contact>,
        @Inject(CACHE_MANAGER)
        private readonly cacheManager: Cache
    ) { }

    async onModuleInit() {
        const contacts = await this.contactRepository.find();
        if (contacts.length > 0) {
            await this.cacheManager.set('all-contacts', contacts);
            console.log('Contactos iniciales cargados en la caché');
        }
    }


    async createContact(createContactDto: CreateContactDto): Promise<Contact> {
        const contact = this.contactRepository.create(createContactDto)

        await this.cacheManager.del('all-contacts')

        return await this.contactRepository.save(contact)
    }

    async editContact(id: number, updateContactDto: UpdateContactDto): Promise<UpdateResult> {
        const updatedContact = await this.contactRepository.update(id, updateContactDto);
        if(updatedContact.affected !== 0){
            await this.cacheManager.del('all-contacts')
        }
        return updatedContact
    }

    async deleteContact(id: number): Promise<DeleteResult> {
        const deletedContact = await this.contactRepository.delete(id);
        if(deletedContact.affected !== 0){
            await this.cacheManager.del('all-contacts')
        }
        return deletedContact
    }

    async getOneById(id: number): Promise<Contact> {
        return await this.contactRepository.findOne({ where: { id } })
    }

    async findAllWithQuery({ name, phone }: QueryDto): Promise<Contact[]> {
        const cacheContacts: Contact[] = await this.cacheManager.get('all-contacts')

        // console.log(cacheContacts);
        


        if (!cacheContacts) {
            const queryBuilder = this.contactRepository.createQueryBuilder('contact');
            if (name)
                queryBuilder.andWhere('LOWER(contact.name) LIKE LOWER(:name)', { name: `%${name}%` });

            if (phone)
                queryBuilder.andWhere('contact.phone LIKE :phone', { phone: `%${phone}%` })

            const contacts = await queryBuilder.getMany();

            if (name || phone) {
                const allContacts = await this.contactRepository.find();
                console.log("existe query se setea todo");

                await this.cacheManager.set('all-contacts', allContacts);
            } else {
                console.log("no existe query se setea get many");
                await this.cacheManager.set('all-contacts', contacts)

            }

            console.log("contactos retornados desde base de datos");

            return contacts
        }

        let filteredCacheContacts = cacheContacts;

        if (name) {
            filteredCacheContacts = filteredCacheContacts.filter(contact =>
                contact.name.toLowerCase().includes(name.toLowerCase())
            );
        }
        if (phone) {
            filteredCacheContacts = filteredCacheContacts.filter(contact =>
                contact.phone.toString().includes(phone)
            );
        }

        console.log("contactos retornados desde cache");

        return filteredCacheContacts;

    }

}
