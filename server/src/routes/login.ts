import * as express from "express"
import {doLogin} from "../controllers/login"

const routerLogin = express.Router()

routerLogin.post("/login", doLogin)


export default routerLogin