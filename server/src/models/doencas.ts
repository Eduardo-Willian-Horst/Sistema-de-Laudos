import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Doencas {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    descricao: string
}
