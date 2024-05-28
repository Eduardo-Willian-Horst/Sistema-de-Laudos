import * as express from "express"
import {addLaudo, deleteLaudo, getLaudo, getLaudos, updateLaudo} from "../controllers/laudo"

const routerLaudo = express.Router()

routerLaudo.get("/laudo/listar", getLaudos)
routerLaudo.get("/laudo/buscar/:id", getLaudo)
routerLaudo.put("/laudo/:id", updateLaudo)
routerLaudo.post("/laudo/criar", addLaudo)
routerLaudo.delete("/laudo/remover/:id", deleteLaudo)

export default routerLaudo