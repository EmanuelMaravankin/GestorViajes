import Agente from "../models/agente.js";

export const getAgentes = async (req, res) => {
    try {
        const agentes = await Agente.find()
        res.json(agentes)
    } catch (error) {
        res.status(500).json({error: "Error al obtener agentes"})
    }
}

export const getAgenteById = async (req, res) => {

    try {
        const agente = await Agentes.findById(req.params.id)
        if(agente){
            res.json(agente)
        }else{
            res.status(404).json({ error: 'Agentes no encontrado'})
        }
    } catch (error) {
        res.status(500).json({ error: "ID Invalido"})
    }

}

export const getAgentesSearch = async (req, res) => {

    const {agente} = req.query;

    try {

        const agentes = await Agente.find({
            nombre: { $regex: `^${nombre}`, $options: 'i'}
        })
        res.json(agentes)
    } catch (error) {
        res.status(500).json({error: "Error al obtener agentes"})
    }
}


export const crearAgente = async (req, res) => {
    const { nombre, email, password, telefono, clientesID, activo } = req.body;

    if (!nombre||!email||!password||!telefono||!clientesID||!activo) {
        return res.status(400).json({ error: "Faltan datos" });
    }

    const nuevo = {
    nombre,
    email,
    password,
    telefono,
    clientesID,
    activo
    }

    try {
        const nuevoAgente = await Agente.create(nuevo);
        res.status(201).json(nuevoAgente);
    } catch (error) {
        res.status(500).json({ error: "Error al crear Agente" });
    }
};

export const actualizarAgente = async (req, res) => {
    const {nombre, email, password, telefono, clientesID, activo } = req.body;

    try {
        const agenteActualizado = await Agente.findByIdAndUpdate(
            req.params.id,
            { nombre, email, password, telefono, clientesID, activo },
            { new: true, runValidators: true }
        );

        if (!agenteActualizado) {
            return res.status(404).json({ error: 'Agente no encontrado' });
        }

        res.json(agenteActualizado);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el agente' });
    }
};

export const eliminarAgente = async (req, res) => {
    try {
        const agenteEliminado = await Agente.findByIdAndDelete(req.params.id);
        if (!agenteEliminado) {
            return res.status(404).json({ error: 'Agente no encontrado' });
        }
        res.json({ mensaje: 'Agente eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el agente' });
    }
};