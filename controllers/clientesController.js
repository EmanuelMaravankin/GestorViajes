import Cliente from "../models/Cliente.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';


export const home = (req, res) => {
    res.send(`<h1>Home de la API</h1>`)
}

export const getClientes = async (req, res) => {
    try {
        const clientes = await Cliente.find()
        res.json(clientes)
    } catch (error) {
        res.status(500).json({error: "Error al obtener clientes"})
    }
}

export const getClienteSearch = async (req, res) => {

    const {nombre} = req.query;

    try {

        const clientes = await Cliente.find({
            nombre: { $regex: `^${nombre}`, $options: 'i'}
        })
        res.json(clientes)
    } catch (error) {
        res.status(500).json({error: "Error al obtener clientes"})
    }
}

export const eliminarCliente = async (req, res) => {
    try {
        const clienteEliminado = await Cliente.findByIdAndDelete(req.params.id);
        if (!clienteEliminado) {
            return res.status(404).json({ error: 'Cliente no encontrado' });
        }
        res.json({ mensaje: 'Cliente eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el cliente' });
    }
}

export const getClienteById = async (req, res) => {

    try {
        const cliente = await Cliente.findById(req.params.id)
        if(cliente){
            res.json(cliente)
        }else{
            res.status(404).json({ error: 'Cliente no encontrado'})
        }
    } catch (error) {
        res.status(500).json({ error: "ID Invalido"})
    }

}

export const CrearCliente = async (req, res) => {  

    const { nombre, fechaNacimiento,telefono, email, password, pasaporte } = req.body;
    if(!nombre || !email ||  !telefono || !fechaNacimiento|| !password || !pasaporte ){
        return res.status(400).json({error: "Faltan datos"})
    }
    if(typeof nombre !== "string" || nombre.trim() === "" || !/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(nombre) ){
        return res.status(400).json({error: "Nombre invalido"});
    }

    if(isNaN(Date.parse(fechaNacimiento))){
        return res.status(400).json({ error: "Email invalido"})
    }

    if(typeof password !== "string" || password.length < 8){
        return res.status(400).json({error: "La contraseña debe tener al menos 8 caracteres"})
    }

    if(typeof pasaporte !== "string" || pasaporte.trim() === ""){
        return res.status(400).json({error: "Pasaporte invalido"})
    }

    if (!/^\d{10}$/.test(telefono)) {
  return res.status(400).json({ error: "Teléfono inválido. Debe contener solo 10 dígitos numéricos" });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
  return res.status(400).json({ error: "Email inválido" });
}

    const hashedPassword = await bcrypt.hash(password, 10);

   
    const cliente = {
        nombre,
        fechaNacimiento,
        email,
        password: hashedPassword,
        telefono,
        pasaporte
    }

    try {
        const nuevoCliente = await Cliente.create(cliente)
        res.status(201).json(nuevoCliente)
    } catch (error) {
        res.status(500).json({error: "Error al crear Cliente"})
    }
    
}

export const actualizarCliente = async (req, res) => {
    const { nombre, email, telefono, fechaNacimiento, pasaporte } = req.body;

    try {
        const clienteActualizado = await Cliente.findByIdAndUpdate(
            req.params.id,
            { nombre, email, telefono, fechaNacimiento, pasaporte },
            { new: true, runValidators: true }
        );

    if(typeof nombre !== "string" || nombre.trim() === "" || !/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(nombre) ){
    return res.status(400).json({error: "Nombre invalido"});
    }

    if(isNaN(Date.parse(fechaNacimiento))){
        return res.status(400).json({ error: "Email invalido"})
    }

    if(typeof pasaporte !== "string" || pasaporte.trim() === ""){
        return res.status(400).json({error: "Pasaporte invalido"})
    }

    if (!/^\d{10}$/.test(telefono)) {
  return res.status(400).json({ error: "Teléfono inválido. Debe contener solo 10 dígitos numéricos" });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
  return res.status(400).json({ error: "Email inválido" });
}

        if (!clienteActualizado) {
            return res.status(404).json({ error: 'Cliente no encontrado' });
        }

        res.json(clienteActualizado);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el cliente' });
    }
}

export const login = async (req,res) =>{
    const {email, password} = req.body;

    if(!email || !password){
        return res.status(400).json({ error: 'Faltan credenciales'})
    }

    try {

        const cliente = await Cliente.findOne({email});

        if(!cliente){
            return res.status(404).json({ error: 'Cliente no encontrado'})
        }

        const match = await bcrypt.compare(password, cliente.password)

        if(!match){
            return res.status(401).json({ error: 'Password incorrecta'})
        }


        // JWT.SIGN
        // Primer argumento, lo que vas a encriptar
        // Segundo argumento, la llave para encriptar / desencriptar
        // Tercer argumento, el tiempo que va a durar ese token
        const datosEncriptados = { id: cliente._id, email: cliente.email, rol: 'admin'}
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
    
