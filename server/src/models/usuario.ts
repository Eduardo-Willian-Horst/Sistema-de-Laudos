import {Entity, Column, PrimaryGeneratedColumn, BeforeInsert} from "typeorm"
import bcrypt from "bcryptjs"

@Entity()
export class Usuario {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    nome: string

    @Column({ unique: true })
    username: string

    @Column()
    email: string

    @Column()
    password: string

    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10);
    }
}