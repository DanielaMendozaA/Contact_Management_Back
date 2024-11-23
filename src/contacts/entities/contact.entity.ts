import { AuditableEntity } from "src/common/entities/auditable.entity";
import { ContactCategoryEnum } from "src/common/enums/category.enum";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity('contacts')
export class Contact extends AuditableEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('text')
    name: string;

    @Column('text')
    email: string;

    @Column('text')
    phone: string;

    @Column('text', { nullable: true })
    photo: string;

    @Column('text', { nullable: true })
    idContactFromDevice: string;

    @Column('decimal', { nullable: true }) 
    latitude: number;

    @Column('double precision', { nullable: true })
    longitude: number;
    
    @Column({
        type: "enum",
        enum: ContactCategoryEnum
    })
    category: ContactCategoryEnum

    @ManyToOne(() => User, user => user.contacts)
    user: User


}
