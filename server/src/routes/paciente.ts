import * as express from "express"
import {addPaciente, deletePaciente, getPaciente, getPacientes, updatePaciente	} from "../controllers/paciente"

const routerPaciente = express.Router()

routerPaciente.get("/paciente/listar", getPacientes)
routerPaciente.get("/paciente/buscar/:id", getPaciente)
routerPaciente.put("/paciente/atualizar/:id", updatePaciente)
routerPaciente.post("/paciente/registrar", addPaciente)
routerPaciente.delete("/paciente/remover/:id", deletePaciente)

export default routerPaciente