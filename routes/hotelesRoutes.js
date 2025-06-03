import express from 'express';
import {
    getHoteles,
    getHotelById,
    crearHotel,
    actualizarHotel,
    eliminarHotel
} from '../controllers/hotelesController.js';

const router = express.Router();

router.get('/api/hoteles', getHoteles);
router.get('/api/hoteles/:id', getHotelById);
router.post('/api/hoteles', crearHotel);
router.put('/api/hoteles/:id', actualizarHotel);
router.delete('/api/hoteles/:id', eliminarHotel);

export default router;