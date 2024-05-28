import * as express from "express"
import {addDoenca, deleteDoenca, getDoenca, getDoencas, updateDoenca} from "../controllers/doencas"

const routerDoenca = express.Router()

routerDoenca.get("/doenca/listar", getDoencas)
routerDoenca.get("/doenca/buscar:id", getDoenca)
routerDoenca.put("/doenca/:id", updateDoenca)
routerDoenca.post("/doenca/inserir", addDoenca)
routerDoenca.delete("/doenca/:id", deleteDoenca)

export default routerDoenca