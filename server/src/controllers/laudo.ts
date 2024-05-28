import { AppDataSource } from "../data-source"
import {Request, Response} from "express"
import {Laudos} from "../models/laudos"

export const getLaudos = async (req: Request, res: Response) => {
    try {
        const laudo:Laudos[] = await AppDataSource.getRepository(Laudos).find()
        res.status(200).json(laudo)
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Erro ao buscar Laudo' })
    }
}

export const getLaudo = async (req: Request, res: Response) => {
    const id: number = +req.params.id
    const results: Laudos = await AppDataSource.getRepository(Laudos).findOneBy({idLaudo: id})

    if(results == null) return res.status(500).json({ message: 'Laudo não encontrado' });
    
    return res.status(200).send(results)
}



export const addLaudo = async (req: Request, res: Response) => {
    
    const laudo: Laudos[] = await AppDataSource.getRepository(Laudos).create(req.body)
    const results: Laudos[] = await AppDataSource.getRepository(Laudos).save(laudo)
    return res.send(results)
}

export const updateLaudo = async (req: Request, res: Response) => {
    const id: number = +req.params.id
    const laudo: Laudos = await AppDataSource.
        getRepository(Laudos).
        findOneBy({ idPaciente: id })

    AppDataSource.getRepository(Laudos).merge(laudo, req.body)
    const results: Laudos = await AppDataSource.getRepository(Laudos).save(laudo)
    return res.send(results)
}

export const deleteLaudo = async (req: Request, res: Response) => {
    const id: number = +req.params.id
    const results = await AppDataSource.getRepository(Laudos).delete(id)
    return res.status(200).send(results)
}