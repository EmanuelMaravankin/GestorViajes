import express from 'express';
import {
    getExcursiones,
    getExcursionById,
    crearExcursion,
    actualizarExcursion,
    eliminarExcursion
} from '../controllers/excursionesController.js';

const router = express.Router();

router.get('/api/excursiones', getExcursiones);
router.get('/api/excursiones/:id', getExcursionById);
router.post('/api/excursiones', crearExcursion);
router.put('/api/excursiones/:id', actualizarExcursion);
router.delete('/api/excursiones/:id', eliminarExcursion);

export default router;