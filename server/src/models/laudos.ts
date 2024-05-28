import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Laudos {
    @PrimaryGeneratedColumn()
    idLaudo: number

    @Column()
    idPaciente: number

    @Column()
    idDoenca: number
}
