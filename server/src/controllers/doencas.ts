import { AppDataSource } from "../data-source"
import {Request, Response} from "express"
import {Doencas} from "../models/doencas"


export const getDoencas = async (req: Request, res: Response) => {
    try {
        const doenca:Doencas[] = await AppDataSource.getRepository(Doencas).find()
        res.status(200).json(doenca)
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Erro ao buscar Doenças' })
    }
}

export const getDoenca = async (req: Request, res: Response) => {
    const id: number = +req.params.id
    const results: Doencas = await AppDataSource.getRepository(Doencas).findOneBy({id: id})
    if(results == null)
        return res.status(500).json({ message: 'Doença não encontrada' });

    return res.status(200).send(results)
}

export const addDoenca = async (req: Request, res: Response) => {
    const doenca: Doencas[] = await AppDataSource.getRepository(Doencas).create(req.body)
    const results: Doencas[] = await AppDataSource.getRepository(Doencas).save(doenca)
    return res.send(results)
}

export const updateDoenca = async (req: Request, res: Response) => {
    const id: number = +req.params.id
    const doenca: Doencas = await AppDataSource.
        getRepository(Doencas).
        findOneBy({ id: id })

    AppDataSource.getRepository(Doencas).merge(doenca, req.body)
    const results: Doencas = await AppDataSource.getRepository(Doencas).save(doenca)
    return res.send(results)
}

export const deleteDoenca = async (req: Request, res: Response) => {
    const id: number = +req.params.id
    const results = await AppDataSource.getRepository(Doencas).delete(id)
    return res.send(results)
}