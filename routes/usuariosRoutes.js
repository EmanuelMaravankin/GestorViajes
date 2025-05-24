import express from 'express';
import {
    home,
    getUsuarios,
    getUsuarioById,
    getUsuariosSearch,
    CrearUsuario,
    login
} from '../controllers/usuariosController.js'
import { protegerRuta } from '../middlewares/authMiddlewares.js';

const router = express.Router()

router.post('/api/login', login)


router.get('/', home)
router.get('/api/usuarios', getUsuarios)
router.get('/api/usuarios/:id', getUsuarioById)
router.get('/api/search/usuarios', getUsuariosSearch)


router.post('/api/usuarios', protegerRuta, CrearUsuario)

export default router