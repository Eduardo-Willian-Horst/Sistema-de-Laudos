import { AppDataSource } from "../data-source"
import {Request, Response} from "express"
import {Usuario} from "../models/usuario"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"


export const doLogin = async (req: Request, res: Response) => {
    const { username, password } = req.body
    if (!username || !password) {
        return res.status(400).json({ error: 'Username e password são obrigatórios' })
    }
    const usuarioRepository = AppDataSource.getRepository(Usuario)
    try {
        const usuario = await usuarioRepository.findOneBy({ username: username })
        if (!usuario) {
            return res.status(401).json({ error: 'Usuário não encontrado' })
        }
        const isPasswordValid = await bcrypt.compare(password, usuario.password)
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Credenciais inválidas' })
        }

        const token = jwt.sign({
            username: username
        }, process.env.TOKEN, { expiresIn: '1h' })

        res.status(200).json({ auth: true, token: token }).send()
    } catch (error) {
        console.error('Erro durante login:', error)
        return res.status(500).json({ error: 'Internal server error' })
    }
}