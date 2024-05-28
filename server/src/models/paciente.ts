import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Paciente {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    nome: string

    @Column()
    dataDeNascimento: string

    @Column()
    sexo: string
}
