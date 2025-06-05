import express from 'express';
import {
    getReservas,
    eliminarReserva,
    actualizarReserva,
    CrearReserva
} from '../controllers/reservasController.js'

const router = express.Router()


router.get('/api/reservas', getReservas)
router.delete('/api/reservas/:id', eliminarReserva)
router.put('/api/reservas/:id',  actualizarReserva)


router.post('/api/reservas', CrearReserva)

export default router