import express from 'express';
import dotenv from 'dotenv'
import usuariosRouter from './routes/usuariosRoutes.js'
import ubicacionesRouter from './routes/ubicacionesRoutes.js'
import hotelesRouter from './routes/hotelesRoutes.js'
import excursionesRouter from './routes/excursionesRoutes.js'
import conectarDB from './config/db.js';

dotenv.config()

const app = express()

const PORT = process.env.PORT || 4000;

conectarDB()

console.log("EL PUERTO ES: ", PORT);


app.use(express.json()) // Para que pueda leer JSON

app.use("/", usuariosRouter) // Manejar middlewares, nos permite conectar nuestro server
app.use("/", ubicacionesRouter) // Rutas para ubicaciones
app.use("/", hotelesRouter) // Rutas para hoteles
app.use("/", excursionesRouter) // Rutas para excursiones


app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`)
})