import * as express from "express"
import {
    addUsuario,
    deleteUsuario,
    getUsuario,
    getUsuarios,
    getUsuariosPaginados,
    updateUsuario
} from "../controllers/usuario"
import Auth from "../controllers/auth";


const routerUsuario = express.Router()

routerUsuario.post("/usuarios/registrar" ,addUsuario)
//routerUsuario.get("/usuarios/listar", Auth.hasAuthorization ,getUsuarios)
routerUsuario.get("/usuarios/listar", Auth.hasAuthorization ,getUsuariosPaginados)
routerUsuario.put("/usuarios/atualizar/:id", Auth.hasAuthorization, updateUsuario)
routerUsuario.delete("/usuarios/remover/:id", Auth.hasAuthorization, deleteUsuario)
routerUsuario.get("/usuarios/buscar/:id", Auth.hasAuthorization, getUsuario)

export default routerUsuario