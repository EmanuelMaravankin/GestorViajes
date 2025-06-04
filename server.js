import express from 'express';
import dotenv from 'dotenv'
import clientesRouter from './routes/clientesRoutes.js'
import reservasRouter from './routes/reservasRoutes.js'
import conectarDB from './config/db.js';

dotenv.config()

const app = express()

const PORT = process.env.PORT || 4000;

conectarDB()

console.log("EL PUERTO ES: ", PORT);


app.use(express.json()) // Para que pueda leer JSON

app.use("/", clientesRouter) // Manejar middlewares, nos permite conectar nuestro server
app.use("/", reservasRouter) 

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`)
})