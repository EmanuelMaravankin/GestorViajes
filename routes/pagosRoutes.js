import express from 'express';
import {
    home,
    getPagos,
    getPagoById,
    crearPago,
    getPagosSearch,
    eliminarPago,
    actualizarPago,
    getPagosByCliente,
    getPagosByReserva
} from '../controllers/pagosController.js'
import { protegerRuta } from '../middlewares/authMiddlewares.js';

const router = express.Router()

router.get('/', home)
router.get('/api/pagos', protegerRuta, getPagos)
router.get('/api/pagos/:id', protegerRuta, getPagoById)
router.get('/api/search/pagos', protegerRuta, getPagosSearch)
router.get('/api/pagos/cliente/:clienteId', protegerRuta, getPagosByCliente)
router.get('/api/pagos/reserva/:reservaId', protegerRuta, getPagosByReserva)
router.delete('/api/pagos/:id', protegerRuta, eliminarPago)
router.put('/api/pagos/:id', protegerRuta, actualizarPago)
router.post('/api/pagos', protegerRuta, crearPago)

export default router 