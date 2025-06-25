import express from 'express';
import {
    home,
    getClientes,
    getClienteById,
    CrearCliente,
    getClienteSearch,
    login,
    eliminarCliente,
    actualizarCliente,
    actualizarProfilePic
} from '../controllers/clientesController.js'
import { protegerRuta } from '../middlewares/authMiddlewares.js';
import { allowUpload } from '../middlewares/uploadMiddlewares.js';


const router = express.Router()

router.post('/api/login', login)


router.get('/', home)
router.get('/api/clientes', getClientes)
router.get('/api/clientes/:id', getClienteById)
router.get('/api/search/clientes', getClienteSearch)
router.delete('/api/clientes/:id', eliminarCliente)
router.put('/api/clientes/:id',  actualizarCliente)


router.post('/api/clientes',protegerRuta,  CrearCliente)
router.put('/api/clientes/', protegerRuta, allowUpload.single('imagen'), actualizarProfilePic)


export default router