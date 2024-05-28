import { AppDataSource } from "../data-source"
import {Request, Response} from "express"
import {Paciente} from "../models/paciente"


export const getPacientes = async (req: Request, res: Response) => {
    try {
        const usuario:Paciente[] = await AppDataSource.getRepository(Paciente).find()
        res.status(200).json(usuario)
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Erro ao buscar Usuario' })
    }
}

export const getPaciente = async (req: Request, res: Response) => {
    const id: number = +req.params.id
    const results: Paciente = await AppDataSource.getRepository(Paciente).findOneBy({id: id})
    if(results == null)
        return res.status(500).json({ message: 'Usuario não encontrado' });

    return res.status(200).send(results)
}

export const addPaciente = async (req: Request, res: Response) => {
    const { nome, dataDeNascimento, sexo } = req.body;

    // Verifica se todos os campos obrigatórios estão presentes
    if (!nome || !dataDeNascimento || !sexo) {
        return res.status(400).send({ message: 'Todos os campos são obrigatórios: nome, dataDeNascimento, sexo' });
    }

    try {
        const usuario = AppDataSource.getRepository(Paciente).create(req.body);
        const results = await AppDataSource.getRepository(Paciente).save(usuario);
        return res.status(200).send(results);
    } catch (error) {
        return res.status(500).send({ message: 'Erro ao adicionar o paciente', error });
    }
};

export const updatePaciente = async (req: Request, res: Response) => {
    const id: number = +req.params.id
    const usuario: Paciente = await AppDataSource.
        getRepository(Paciente).
        findOneBy({ id: id })

    AppDataSource.getRepository(Paciente).merge(usuario, req.body)
    const results: Paciente = await AppDataSource.getRepository(Paciente).save(usuario)
    return res.send(results)
}

export const deletePaciente = async (req: Request, res: Response) => {
    const id: number = +req.params.id
    const results = await AppDataSource.getRepository(Paciente).delete(id)
    return res.send(results)
}