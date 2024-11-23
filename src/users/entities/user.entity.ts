import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { AuditableEntity } from "src/common/entities/auditable.entity";
import { Contact } from "src/contacts/entities/contact.entity";


@Entity('users')
export class User extends AuditableEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text', { name: 'user_name'})
    userName: string;

    @Column('text', { unique: true})
    email: string;

    @Column('text', { select: false})
    password: string;

    @OneToMany(() => Contact, contact => contact.user)
    contacts: Contact[]
}
