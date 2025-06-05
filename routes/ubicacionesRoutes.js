import express from 'express';
import {
    getUbicaciones,
    getUbicacionById,
    crearUbicacion,
    actualizarUbicacion,
    eliminarUbicacion
} from '../controllers/ubicacionesController.js';

const router = express.Router();

router.get('/api/ubicaciones', getUbicaciones);
router.get('/api/ubicaciones/:id', getUbicacionById);
router.post('/api/ubicaciones', crearUbicacion);
router.put('/api/ubicaciones/:id', actualizarUbicacion);
router.delete('/api/ubicaciones/:id', eliminarUbicacion);

export default router;