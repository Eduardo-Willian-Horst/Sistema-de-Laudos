import {Request, Response} from "express"
import {AppDataSource} from "../data-source"
import {Usuario} from "../models/usuario"
import dotenv from "dotenv"

dotenv.config()

export const addUsuario = async (req: Request, res: Response) => {
    try {
        const username: string = req.body.username
        if (!username) {
            return res.status(400).json({ error: 'usuário é obrigatório' })
        }
        const usuarioCadastrado = await usuarioRegistrado(username)

        if(usuarioCadastrado != null) {
            return res.status(409).json({ message: 'Usuário já cadastrado' }).send()
        }

        const usuario: Usuario[] = AppDataSource.getRepository(Usuario).create(req.body)
        const results: Usuario[] = await AppDataSource.getRepository(Usuario).save(usuario)
        return res.status(200).send(results)
    } catch (error) {
        res.status(500).json({ message: 'Erro ao inserir Usuario' })
    }
}

export const getUsuarios = async (req: Request, res: Response) => {
    try {
        const results: Usuario[] = await AppDataSource.getRepository(Usuario).find()
        return res.status(200).send(results)
    } catch (error) {
        res.status(500).json({ message: 'Erro ao inserir Usuario' })
    }
}

export const getUsuariosPaginados = async (req: Request, res: Response) => {
    try {
        const ITEMS_PER_PAGE = 10
        const page = parseInt(req.query.page as string) || 1
        const skip = (page - 1) * ITEMS_PER_PAGE
        const usuarioRepository = AppDataSource.getRepository(Usuario)
        const [entities, total] = await usuarioRepository.findAndCount({
            skip,
            take: ITEMS_PER_PAGE,
        });

        const totalPages = Math.ceil(total / ITEMS_PER_PAGE)
        const response = {
            items: entities,
            page,
            totalPages,
            totalItems: total,
        }
        res.json(response)
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar Usuarios' })
    }
}

export const updateUsuario = async (req: Request, res: Response) => {
    try {
        const id: number = +req.params.id
        if (!id) {
            return res.status(400).json({ error: 'id não encontrado' })
        }
        const usuario: Usuario = await AppDataSource.getRepository(Usuario).findOneBy({ id: id })
        if (!usuario) {
            return res.status(400).json({ error: 'usuário inválido' })
        }

        AppDataSource.getRepository(Usuario).merge(usuario, req.body)
        const results: Usuario = await AppDataSource.getRepository(Usuario).save(usuario)
        return res.status(200).send(results)
    } catch (error) {
        res.status(500).json({ message: 'Erro ao atualizar Usuario' })
    }
}

export const deleteUsuario = async (req: Request, res: Response) => {
    try {
        const id: number = +req.params.id
        if (!id) {
            return res.status(400).json({error: 'usuário não encontrado'})
        }
        const results = await AppDataSource.getRepository(Usuario).delete(id)
        return res.status(204).send(results)
    } catch (error) {
        res.status(500).json({ message: 'Erro ao deletar Usuario' })
    }
}

export const getUsuario = async (req: Request, res: Response) => {
    try {
        const id: number = +req.params.id
        if (!id) {
            return res.status(400).json({error: 'usuário não encontrado'})
        }
        const results = await AppDataSource.getRepository(Usuario).findOneBy({id: id})
        return res.status(200).send(results)
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar Usuario' })
    }
}

export const usuarioRegistrado = async (username: string) => {
    return await AppDataSource.getRepository(Usuario).findOneBy({username: username})
}