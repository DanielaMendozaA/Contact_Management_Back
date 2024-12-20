import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Seeder } from "typeorm-extension";
import { Contact } from "src/contacts/entities/contact.entity";
import { ContactCategoryEnum } from "src/common/enums/category.enum";
import { User } from "src/users/entities/user.entity";

@Injectable()
export class ContactsSeeder implements Seeder {
    constructor(
        @InjectRepository(Contact)
        private readonly contactRepository: Repository<Contact>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) { }

    async run(): Promise<void> {
        const userToAdd = await this.userRepository.findOne({
            where: { id: 'b3c8f867-2dcd-40c8-9afc-9231ef4ab8f9' },
        });

        if (!userToAdd) {
            console.log("Usuario no encontrado");
            return;
        }

        const contacts = [
            {
                name: "Daniela Mendoza A",
                email: "daniela.mendoza@example.com",
                phone: '1234567890',
                latitude: 37.7749,
                longitude: -122.4194,
                category: ContactCategoryEnum.CLIENT,
                user: userToAdd
            },
            {
                name: "Carlos Ramirez",
                email: "carlos.ramirez@example.com",
                phone: '9876543210',
                latitude: 40.7128,
                longitude: -74.0060,
                category: ContactCategoryEnum.EMPLOYEE,
                user: userToAdd
            },
            {
                name: "Mariana Lopez",
                email: "mariana.lopez@example.com",
                phone: '4567891230',
                latitude: 34.0522,
                longitude: -118.2437,
                category: ContactCategoryEnum.CLIENT,
                user: userToAdd
            },
            {
                name: "Juan Perez",
                email: "juan.perez@example.com",
                phone: '1597534862',
                latitude: 51.5074,
                longitude: -0.1278,
                category: ContactCategoryEnum.EMPLOYEE,
                user: userToAdd
            },
            {
                name: "Lucia Gomez",
                email: "lucia.gomez@example.com",
                phone: '7531594862',
                latitude: 48.8566,
                longitude: 2.3522,
                category: ContactCategoryEnum.CLIENT,
                user: userToAdd
            },
            {
                name: "Andres Martinez",
                email: "andres.martinez@example.com",
                phone: '3216549870',
                latitude: 41.9028,
                longitude: 12.4964,
                category: ContactCategoryEnum.EMPLOYEE,
                user: userToAdd
            },
            {
                name: "Sofia Fernandez",
                email: "sofia.fernandez@example.com",
                phone: '7412589630',
                latitude: 35.6895,
                longitude: 139.6917,
                category: ContactCategoryEnum.CLIENT,
                user: userToAdd
            },
            {
                name: "Roberto Diaz",
                email: "roberto.diaz@example.com",
                phone: '8529637410',
                latitude: 55.7558,
                longitude: 37.6176,
                category: ContactCategoryEnum.EMPLOYEE,
                user: userToAdd
            },
            {
                name: "Valeria Torres",
                email: "valeria.torres@example.com",
                phone: '9517534862',
                latitude: -33.8688,
                longitude: 151.2093,
                category: ContactCategoryEnum.CLIENT,
                user: userToAdd
            },
            {
                name: "Miguel Castro",
                email: "miguel.castro@example.com",
                phone: '3698521470',
                latitude: 19.4326,
                longitude: -99.1332,
                category: ContactCategoryEnum.EMPLOYEE,
                user: userToAdd
            },
            {
                name: "Camila Alvarez",
                email: "camila.alvarez@example.com",
                phone: '7894561230',
                latitude: 39.9042,
                longitude: 116.4074,
                category: ContactCategoryEnum.CLIENT,
                user: userToAdd
            },
            {
                name: "Ricardo Morales",
                email: "ricardo.morales@example.com",
                phone: '2589631470',
                latitude: 28.6139,
                longitude: 77.2090,
                category: ContactCategoryEnum.EMPLOYEE,
                user: userToAdd
            },
            {
                name: "Isabella Reyes",
                email: "isabella.reyes@example.com",
                phone: '4561237890',
                latitude: 52.5200,
                longitude: 13.4050,
                category: ContactCategoryEnum.CLIENT,
                user: userToAdd
            },
            {
                name: "Francisco Rojas",
                email: "francisco.rojas@example.com",
                phone: '1472583690',
                latitude: 59.3293,
                longitude: 18.0686,
                category: ContactCategoryEnum.EMPLOYEE,
                user: userToAdd
            },
            {
                name: "Elena Suarez",
                email: "elena.suarez@example.com",
                phone: '7539514560',
                latitude: 60.1695,
                longitude: 24.9354,
                category: ContactCategoryEnum.CLIENT,
                user: userToAdd
            },
            {
                name: "Andrea Morales",
                email: "ricardo.morales@example.com",
                phone: '2589631470',
                latitude: 28.6139,
                longitude: 77.2090,
                category: ContactCategoryEnum.EMPLOYEE,
                user: userToAdd
            },
            {
                name: "Isabella Reyes",
                email: "isabella.reyes@example.com",
                phone: '4561237890',
                latitude: 52.5200,
                longitude: 13.4050,
                category: ContactCategoryEnum.CLIENT,
                user: userToAdd
            },
            {
                name: "Francisco Rojas",
                email: "francisco.rojas@example.com",
                phone: '1472583690',
                latitude: 59.3293,
                longitude: 18.0686,
                category: ContactCategoryEnum.EMPLOYEE,
                user: userToAdd
            },
            {
                name: "Elena Suarez",
                email: "elena.suarez@example.com",
                phone: '7539514560',
                latitude: 60.1695,
                longitude: 24.9354,
                category: ContactCategoryEnum.CLIENT,
                user: userToAdd
            }
        ];

        for (let i = 4; i <= 100; i++) {
            contacts.push({
                name: `Contact ${i}`,
                email: `contact${i}@example.com`,
                phone: `${1000000000 + i}`,
                latitude: Math.random() * 180 - 90, 
                longitude: Math.random() * 360 - 180,
                category: i % 2 === 0 ? ContactCategoryEnum.CLIENT : ContactCategoryEnum.EMPLOYEE,
                user: userToAdd
            });
        }

        for (const contact of contacts) {
            const contactExists = await this.contactRepository.findOneBy({ email: contact.email });
            if (!contactExists) {
                const newContact = this.contactRepository.create(contact);
                await this.contactRepository.save(newContact);
                // Logger.log(`Contact ${contact.email} created`);
            } else {
                // Logger.log(`Contact ${contact.email} already exists`);
            }
        }
    }
}
