import express from 'express';
import {
    getAgentes,
    getAgenteById,
    crearAgente,
    getAgentesSearch,
    eliminarAgente,
    actualizarAgente
} from '../controllers/agentesController.js'
import { protegerRuta } from '../middlewares/authMiddlewares.js';

const router = express.Router()

router.get('/api/agentes', getAgentes)
router.get('/api/agentes/:id', getAgenteById)
router.get('/api/agentes/usuarios', getAgentesSearch)
router.post('/api/agentes/:id', protegerRuta, crearAgente)
router.delete('/api/agentes/:id', protegerRuta, eliminarAgente)
router.put('/api/agentes/:id', protegerRuta, actualizarAgente)

export default router