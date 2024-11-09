import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { AuditableEntity } from "src/common/entities/auditable.entity";


@Entity('users')
export class User extends AuditableEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text', { name: 'user_name', unique: true})
    userName: string;

    @Column('text', { unique: true})
    email: string;

    @Column('text', { select: false})
    password: string;
}
