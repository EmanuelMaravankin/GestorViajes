import express from 'express';
import {
    home,
    getUsuarios,
    getUsuarioById,
    getUsuariosSearch,
    CrearUsuario,
} from '../controllers/usuariosController.js'

const router = express.Router()


router.get('/', home)
router.get('/api/usuarios', getUsuarios)
router.get('/api/usuarios/:id', getUsuarioById)
router.get('/api/search/usuarios', getUsuariosSearch)

router.post('/api/usuarios', CrearUsuario)

export default router