import express from "express"
import {AppDataSource} from "./data-source"
import cors from "cors"
import routerUsuario from "./routes/usuario"
import routerLogin from "./routes/login"
import routerPaciente from "./routes/paciente"
import {seedUsers} from "./seeders/usuario";
import routerDoenca from "./routes/doenca"
import routerLaudo from "./routes/laudo"

AppDataSource.initialize().then(() => {
  console.log("Data Source has been initialized!")
  /*seedUsers().then(
      r => console.log("feito")
  ).catch(
      err => console.log(err)
  )*/
}).catch((err) => {
  console.error("Error during Data Source initialization:", err)
})

const app = express()
const port = 3001
app.use(express.json())
app.use(cors())

app.use("/", routerUsuario)
app.use("/", routerLogin)
app.use("/", routerPaciente)
app.use("/", routerDoenca)
app.use("/", routerLaudo)


app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`)
})
