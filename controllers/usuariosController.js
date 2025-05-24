import Usuario from "../models/Usuario.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';


export const home = (req, res) => {
    res.send(`<h1>Home de la API</h1>`)
}

export const getUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.find()
        res.json(usuarios)
    } catch (error) {
        res.status(500).json({error: "Error al obtener usuarios"})
    }
}

export const getUsuariosSearch = async (req, res) => {

    const {nombre} = req.query;

    try {

        const usuarios = await Usuario.find({
            nombre: { $regex: `^${nombre}`, $options: 'i'}
        })
        res.json(usuarios)
    } catch (error) {
        res.status(500).json({error: "Error al obtener usuarios"})
    }
}

export const eliminarUsuario = async (req, res) => {
    try {
        const usuarioEliminado = await Usuario.findByIdAndDelete(req.params.id);
        if (!usuarioEliminado) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        res.json({ mensaje: 'Usuario eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el usuario' });
    }
}

export const getUsuarioById = async (req, res) => {

    try {
        const usuario = await Usuario.findById(req.params.id)
        if(usuario){
            res.json(usuario)
        }else{
            res.status(404).json({ error: 'Usuario no encontrado'})
        }
    } catch (error) {
        res.status(500).json({ error: "ID Invalido"})
    }

}

export const CrearUsuario = async (req, res) => {  

    const { nombre, fechaNacimiento,telefono, email, password } = req.body;
    if(!nombre || !email ||  !telefono || !fechaNacimiento|| !password){
        return res.status(400).json({error: "Faltan datos"})
    }

    const hashedPassword = await bcrypt.hash(password, 10);

   
    const usuario = {
        nombre,
        fechaNacimiento,
        email,
        password: hashedPassword,
        telefono
    }

    try {
        const nuevoUsuario = await Usuario.create(usuario)
        res.status(201).json(nuevoUsuario)
    } catch (error) {
        res.status(500).json({error: "Error al crear Usuario"})
    }
    
}

export const actualizarUsuario = async (req, res) => {
    const { nombre, email, telefono, fechaNacimiento } = req.body;

    try {
        const usuarioActualizado = await Usuario.findByIdAndUpdate(
            req.params.id,
            { nombre, email, telefono, fechaNacimiento },
            { new: true, runValidators: true }
        );

        if (!usuarioActualizado) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        res.json(usuarioActualizado);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el usuario' });
    }
}

export const login = async (req,res) =>{
    const {email, password} = req.body;

    if(!email || !password){
        return res.status(400).json({ error: 'Faltan credenciales'})
    }

    try {

        const usuario = await Usuario.findOne({email});

        if(!usuario){
            return res.status(404).json({ error: 'Usuario no encontrado'})
        }

        const match = await bcrypt.compare(password, usuario.password)

        if(!match){
            return res.status(401).json({ error: 'Password incorrecta'})
        }


        // JWT.SIGN
        // Primer argumento, lo que vas a encriptar
        // Segundo argumento, la llave para encriptar / desencriptar
        // Tercer argumento, el tiempo que va a durar ese token
        const datosEncriptados = { id: usuario._id, email: usuario.email, rol: 'admin'}
        const JWT_KEY = process.env.JWT_SECRET
        const token = jwt.sign(
            datosEncriptados,
            JWT_KEY,
            { expiresIn: '1h'}
        )

        res.json({ accessToken: token})
        
    } catch (error) {
        res.status(500).json({error: 'Error al hacer login'})
    }
}
    
