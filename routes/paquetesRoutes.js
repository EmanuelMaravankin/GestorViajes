import express from 'express';
import {
    getPaquetes,
    getPaqueteById,
    crearPaquete,
    getPaquetesSearch,
    eliminarPaquete,
    actualizarPaquete
} from '../controllers/paquetesController.js'
import { protegerRuta } from '../middlewares/authMiddlewares.js';

const router = express.Router()

router.get('/api/paquetes', getPaquetes)
router.get('/api/paquetes/:id', getPaqueteById)
router.get('/api/paquetes/usuarios', getPaquetesSearch)
router.post('/api/paquetes', protegerRuta, crearPaquete)
router.delete('/api/paquetes/:id', protegerRuta, eliminarPaquete)
router.put('/api/paquetes/:id', protegerRuta, actualizarPaquete)

export default router;