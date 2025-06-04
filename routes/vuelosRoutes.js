import express from 'express';
import {
    home,
    getVuelos,
    getVueloById,
    crearVuelo,
    getVuelosSearch,
    eliminarVuelo,
    actualizarVuelo
} from '../controllers/vuelosController.js'
import { protegerRuta } from '../middlewares/authMiddlewares.js';

const router = express.Router()

router.get('/', home)
router.get('/api/vuelos', getVuelos)
router.get('/api/vuelos/:id', getVueloById)
router.get('/api/search/vuelos', getVuelosSearch)
router.delete('/api/vuelos/:id', protegerRuta, eliminarVuelo)
router.put('/api/vuelos/:id', protegerRuta, actualizarVuelo)
router.post('/api/vuelos', protegerRuta, crearVuelo)

export default router 