import {Usuario} from "../models/usuario"
import faker from "faker"
import {AppDataSource} from "../data-source";

export const seedUsers = async () => {
    const usuarioRepository = AppDataSource.getRepository(Usuario);
    const seeds = 100;
    const usuarioToSeed = Array.from({ length: seeds }, () => ({
        nome: faker.internet.userName(),
        username: faker.internet.userName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
    }));

    await Promise.all(
        usuarioToSeed.map(async (usuarioData) => {
            const usuario = usuarioRepository.create(usuarioData)
            await usuarioRepository.save(usuario)
        })
    );

    console.log(`${seeds} usuarios criados.`);
};
