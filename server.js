import express from 'express';
import dotenv from 'dotenv'

import clientesRouter from './routes/clientesRoutes.js'
import reservasRouter from './routes/reservasRoutes.js'
import ubicacionesRouter from './routes/ubicacionesRoutes.js'
import hotelesRouter from './routes/hotelesRoutes.js'
import excursionesRouter from './routes/excursionesRoutes.js'
import vuelosRouter from './routes/vuelosRoutes.js'
import pagosRouter from './routes/pagosRoutes.js'
import paquetesRouter from './routes/paquetesRoutes.js'
import agentesRouter from './routes/agentesRoutes.js'
import conectarDB from './config/db.js';

dotenv.config()

const app = express()

const PORT = process.env.PORT || 4000;

conectarDB()

console.log("EL PUERTO ES: ", PORT);


app.use(express.json()) // Para que pueda leer JSON

app.use("/", clientesRouter) // Manejar middlewares, nos permite conectar nuestro server
app.use("/", reservasRouter) 
app.use("/", ubicacionesRouter) // Rutas para ubicaciones
app.use("/", hotelesRouter) // Rutas para hoteles
app.use("/", excursionesRouter) // Rutas para excursiones
app.use("/", vuelosRouter) // Rutas para vuelos
app.use("/", pagosRouter) // Rutas para pagos
app.use("/", paquetesRouter) // Rutas para paquetes
app.use("/", agentesRouter) // Rutas para agentes

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`)
})