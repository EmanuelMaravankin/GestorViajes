import Ubicacion from "../models/Ubicacion.js";

export const getUbicaciones = async (req, res) => {
    try {
        const ubicaciones = await Ubicacion.find();
        res.json(ubicaciones);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener ubicaciones" });
    }
};

export const getUbicacionById = async (req, res) => {
    try {
        const ubicacion = await Ubicacion.findById(req.params.id);
        if (ubicacion) {
            res.json(ubicacion);
        } else {
            res.status(404).json({ error: 'Ubicación no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: "ID Inválido" });
    }
};

export const crearUbicacion = async (req, res) => {
    const { nombre, pais, ciudad, codigoPostal } = req.body;
    
    if (!nombre || !pais || !ciudad) {
        return res.status(400).json({ error: "Faltan datos requeridos: nombre, país y ciudad son obligatorios" });
    }

    const ubicacion = {
        nombre,
        pais,
        ciudad,
        codigoPostal
    };

    try {
        const nuevaUbicacion = await Ubicacion.create(ubicacion);
        res.status(201).json(nuevaUbicacion);
    } catch (error) {
        res.status(500).json({ error: "Error al crear ubicación" });
    }
};

export const actualizarUbicacion = async (req, res) => {
    const { nombre, pais, ciudad, codigoPostal } = req.body;

    try {
        const ubicacionActualizada = await Ubicacion.findByIdAndUpdate(
            req.params.id,
            { nombre, pais, ciudad, codigoPostal },
            { new: true, runValidators: true }
        );

        if (!ubicacionActualizada) {
            return res.status(404).json({ error: 'Ubicación no encontrada' });
        }

        res.json(ubicacionActualizada);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar la ubicación' });
    }
};

export const eliminarUbicacion = async (req, res) => {
    try {
        const ubicacionEliminada = await Ubicacion.findByIdAndDelete(req.params.id);
        if (!ubicacionEliminada) {
            return res.status(404).json({ error: 'Ubicación no encontrada' });
        }
        res.json({ mensaje: 'Ubicación eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar la ubicación' });
    }
};