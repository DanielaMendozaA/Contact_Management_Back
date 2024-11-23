import { DeleteResult, UpdateResult } from "typeorm";
import { CreateContactDto } from "../dto/create-contact.dto";
import { UpdateContactDto } from "../dto/update-contact.dto";
import { Contact } from "../entities/contact.entity";
import { QueryDto } from "../dto/query-contact.dto";
import { QueryContactByIdDto } from "../dto/query-contact-by-id.dto";

export interface IContactService{
    createContact(createContactDto: CreateContactDto): Promise<Contact>
    editContact(id: number, updateContactDto: UpdateContactDto): Promise<UpdateResult>
    deleteContact(id: number): Promise<DeleteResult>
    getOneById(id: number): Promise<Contact>
    findAllWithQuery(query: QueryDto): Promise<Contact[]>
    findContactsByUserId(queryDto: QueryContactByIdDto): Promise<PaginatedResult<Contact>>
    getContactsByUserIdNoQuery(userId: string): Promise<Contact[]>
}