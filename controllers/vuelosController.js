import Vuelos from "../models/Vuelos.js";

export const home = (req, res) => {
    res.send(`<h1>Home de la API de Vuelos</h1>`)
}

export const getVuelos = async (req, res) => {
    try {
        const vuelos = await Vuelos.find()
        res.json(vuelos)
    } catch (error) {
        res.status(500).json({error: "Error al obtener vuelos"})
    }
}

export const getVuelosSearch = async (req, res) => {
    const {origen, destino} = req.query;

    try {
        const query = {};
        if (origen) {
            query.origen = { $regex: `^${origen}`, $options: 'i' };
        }
        if (destino) {
            query.destino = { $regex: `^${destino}`, $options: 'i' };
        }

        const vuelos = await Vuelos.find(query)
        res.json(vuelos)
    } catch (error) {
        res.status(500).json({error: "Error al buscar vuelos"})
    }
}

export const eliminarVuelo = async (req, res) => {
    try {
        const vueloEliminado = await Vuelos.findByIdAndDelete(req.params.id);
        if (!vueloEliminado) {
            return res.status(404).json({ error: 'Vuelo no encontrado' });
        }
        res.json({ mensaje: 'Vuelo eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el vuelo' });
    }
}

export const getVueloById = async (req, res) => {
    try {
        const vuelo = await Vuelos.findById(req.params.id)
        if(vuelo){
            res.json(vuelo)
        }else{
            res.status(404).json({ error: 'Vuelo no encontrado'})
        }
    } catch (error) {
        res.status(500).json({ error: "ID Invalido"})
    }
}

export const crearVuelo = async (req, res) => {  
    const { 
        aerolinea, 
        origen, 
        destino, 
        fechaHoraSalida, 
        fechaHoraLlegada, 
        costo, 
        asientosDisponibles 
    } = req.body;

    if(!aerolinea || !origen || !destino || !fechaHoraSalida || !fechaHoraLlegada || !costo || !asientosDisponibles){
        return res.status(400).json({error: "Faltan datos requeridos"})
    }

    
    if(new Date(fechaHoraLlegada) <= new Date(fechaHoraSalida)) {
        return res.status(400).json({error: "La fecha de llegada debe ser posterior a la fecha de salida"})
    }

    
    if(costo <= 0 || asientosDisponibles <= 0) {
        return res.status(400).json({error: "El costo y los asientos disponibles deben ser números positivos"})
    }

    const vuelo = {
        aerolinea,
        origen,
        destino,
        fechaHoraSalida,
        fechaHoraLlegada,
        costo,
        asientosDisponibles
    }

    try {
        const nuevoVuelo = await Vuelos.create(vuelo)
        res.status(201).json(nuevoVuelo)
    } catch (error) {
        res.status(500).json({error: "Error al crear el vuelo"})
    }
}

export const actualizarVuelo = async (req, res) => {
    const { 
        aerolinea, 
        origen, 
        destino, 
        fechaHoraSalida, 
        fechaHoraLlegada, 
        costo, 
        asientosDisponibles 
    } = req.body;

    try {
        
        if(fechaHoraLlegada && fechaHoraSalida && new Date(fechaHoraLlegada) <= new Date(fechaHoraSalida)) {
            return res.status(400).json({error: "La fecha de llegada debe ser posterior a la fecha de salida"})
        }

        
        if((costo && costo <= 0) || (asientosDisponibles && asientosDisponibles <= 0)) {
            return res.status(400).json({error: "El costo y los asientos disponibles deben ser números positivos"})
        }

        const vueloActualizado = await Vuelos.findByIdAndUpdate(
            req.params.id,
            { 
                aerolinea, 
                origen, 
                destino, 
                fechaHoraSalida, 
                fechaHoraLlegada, 
                costo, 
                asientosDisponibles 
            },
            { new: true, runValidators: true }
        );

        if (!vueloActualizado) {
            return res.status(404).json({ error: 'Vuelo no encontrado' });
        }

        res.json(vueloActualizado);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el vuelo' });
    }
} 