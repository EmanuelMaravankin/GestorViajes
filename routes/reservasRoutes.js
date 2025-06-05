import express from 'express';
import {
    getReservas,
    getReservaById,
    eliminarReserva,
    actualizarReserva
  
} from '../controllers/reservasController.js'

const router = express.Router()

router.post('/api/login', login)


router.get('/api/reservas', getReservas)
router.get('/api/reservas/:id', getReservaById)
router.delete('/api/reservas/:id', eliminarReserva)
router.put('/api/reservas/:id',  actualizarReserva)


router.post('/api/reservas', CrearReserva)

export default router