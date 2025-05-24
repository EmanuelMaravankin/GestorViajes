import Usuario from "../models/Usuario.js";
import bcrypt from "bcryptjs";

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
    if(!nombre || !edad || !email ||  !telefono || !fechaNacimiento|| !password){
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
 