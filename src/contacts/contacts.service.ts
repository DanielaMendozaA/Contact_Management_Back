import { BadRequestException, Inject, Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { IContactService } from './interfaces/contact-service.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Contact } from './entities/contact.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { QueryDto } from './dto/query-contact.dto';
import { User } from 'src/users/entities/user.entity';
import { isUUID } from 'class-validator';
import { QueryContactByIdDto } from './dto/query-contact-by-id.dto';

@Injectable()
export class ContactsService implements IContactService {
    constructor(
        @InjectRepository(Contact)
        private readonly contactRepository: Repository<Contact>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        // @Inject(CACHE_MANAGER)
        // private readonly cacheManager: Cache
    ) { }

    // async onModuleInit() {
    //     const contacts = await this.contactRepository.find();
    //     if (contacts.length > 0) {
    //         await this.cacheManager.set('all-contacts', contacts);
    //     }
    // }


    async createContact(createContactDto: CreateContactDto): Promise<Contact> {
        const userId = createContactDto.userId
        const user = await this.userRepository.findOne({ where: { id: userId } });
        const contact = this.contactRepository.create({ ...createContactDto, user });

        // await this.cacheManager.del('all-contacts')

        return await this.contactRepository.save(contact)
    }

    async editContact(id: number, updateContactDto: UpdateContactDto): Promise<UpdateResult> {
        const updatedContact = await this.contactRepository.update(id, updateContactDto);
        // if(updatedContact.affected !== 0){
        //     await this.cacheManager.del('all-contacts')
        // }
        return updatedContact
    }

    async deleteContact(id: number): Promise<DeleteResult> {
        const deletedContact = await this.contactRepository.delete(id);
        // if(deletedContact.affected !== 0){
        //     await this.cacheManager.del('all-contacts')
        // }
        return deletedContact
    }

    async getOneById(id: number): Promise<Contact> {
        return await this.contactRepository.findOne({ where: { id } })
    }

    async findAllWithQuery({ name, phone }: QueryDto): Promise<Contact[]> {
        // const cacheContacts: Contact[] = await this.cacheManager.get('all-contacts')


        const queryBuilder = this.contactRepository.createQueryBuilder('contact');
        if (name)
            queryBuilder.andWhere('LOWER(contact.name) LIKE LOWER(:name)', { name: `%${name}%` });

        if (phone)
            queryBuilder.andWhere('contact.phone LIKE :phone', { phone: `%${phone}%` })



        // if (name || phone) {
        //     const allContacts = await this.contactRepository.find();

        //     // await this.cacheManager.set('all-contacts', allContacts);
        // } else {
        //     // await this.cacheManager.set('all-contacts', contacts)

        // }

        return await queryBuilder.getMany()


        // if (!cacheContacts) {
        //     const queryBuilder = this.contactRepository.createQueryBuilder('contact');
        //     if (name)
        //         queryBuilder.andWhere('LOWER(contact.name) LIKE LOWER(:name)', { name: `%${name}%` });

        //     if (phone)
        //         queryBuilder.andWhere('contact.phone LIKE :phone', { phone: `%${phone}%` })

        //     const contacts = await queryBuilder.getMany();

        //     if (name || phone) {
        //         const allContacts = await this.contactRepository.find();

        //         await this.cacheManager.set('all-contacts', allContacts);
        //     } else {
        //         await this.cacheManager.set('all-contacts', contacts)

        //     }

        //     return contacts
        // }

        // let filteredCacheContacts = cacheContacts;

        // if (name) {
        //     filteredCacheContacts = filteredCacheContacts.filter(contact =>
        //         contact.name.toLowerCase().includes(name.toLowerCase())
        //     );
        // }
        // if (phone) {
        //     filteredCacheContacts = filteredCacheContacts.filter(contact =>
        //         contact.phone.toString().includes(phone)
        //     );
        // }


        // return filteredCacheContacts;

    }


    async findContactsByUserId({ name, phone, userId, limit = 10, page = 1 }: QueryContactByIdDto): Promise<PaginatedResult<Contact>> {
        if (!isUUID(userId))
            throw new BadRequestException('userId should be uuid')

        const skip = (page - 1) * limit;
        const take = limit;

        const queryBuilder = this.contactRepository
            .createQueryBuilder('contact')
            .leftJoinAndSelect('contact.user', 'user')
            .where('contact.userId = :userId', { userId })


        if (name && name.trim().length > 0) {

            queryBuilder.andWhere(
                "LOWER(contact.name) LIKE :name",
                { name: `%${name}%` }
            );
        }

        if (phone && phone.trim().length > 0) {
            queryBuilder.andWhere('contact.phone LIKE :phone', { phone: `%${phone}%` });
        }

        queryBuilder.orderBy('contact.name', 'ASC');
        const [contacts, total] = await queryBuilder.skip(skip).take(take).getManyAndCount();

        // console.log(queryBuilder.getSql());


        return {
            data: contacts,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        };

    }

    async getContactsByUserIdNoQuery(userId: string): Promise<Contact[]>{
        if (!isUUID(userId))
            throw new BadRequestException('userId should be uuid')

        const user = this.userRepository.findOne({where: {
            id: userId
        }})

        if(!user)
            throw new NotFoundException("user not found")

        const contacts = await this.contactRepository.find({
            relations: ['user'],
            where: {
                user: {
                    id: userId
                }
            }
        })

        return contacts


    }

}
