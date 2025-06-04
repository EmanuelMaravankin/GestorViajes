import Excursion from "../models/Excursion.js";
import Ubicacion from "../models/Ubicacion.js";

export const getExcursiones = async (req, res) => {
    try {
        const { ubicacion } = req.query;
        let filtro = {};
        
        if (ubicacion) {
            filtro.ubicacion = ubicacion;
        }
        
        const excursiones = await Excursion.find(filtro).populate('ubicacion');
        res.json(excursiones);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener excursiones" });
    }
};

export const getExcursionById = async (req, res) => {
    try {
        const excursion = await Excursion.findById(req.params.id).populate('ubicacion');
        if (excursion) {
            res.json(excursion);
        } else {
            res.status(404).json({ error: 'Excursión no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: "ID Inválido" });
    }
};

export const crearExcursion = async (req, res) => {
    const { nombre, descripcion, ubicacion, duracion, precio, proveedor, idiomas, activo } = req.body;
    
    if (!nombre || !ubicacion || !duracion || precio === undefined) {
        return res.status(400).json({ 
            error: "Faltan datos requeridos: nombre, ubicación, duración y precio son obligatorios" 
        });
    }

    try {
        // Verificar que la ubicación existe
        const ubicacionExiste = await Ubicacion.findById(ubicacion);
        if (!ubicacionExiste) {
            return res.status(400).json({ error: "La ubicación especificada no existe" });
        }

        const excursion = {
            nombre,
            descripcion,
            ubicacion,
            duracion,
            precio,
            proveedor,
            idiomas,
            activo: activo !== undefined ? activo : true
        };

        const nuevaExcursion = await Excursion.create(excursion);
        const excursionConUbicacion = await Excursion.findById(nuevaExcursion._id).populate('ubicacion');
        res.status(201).json(excursionConUbicacion);
    } catch (error) {
        res.status(500).json({ error: "Error al crear excursión" });
    }
};

export const actualizarExcursion = async (req, res) => {
    const { nombre, descripcion, ubicacion, duracion, precio, proveedor, idiomas, activo } = req.body;

    try {
        // Si se proporciona una nueva ubicación, verificar que existe
        if (ubicacion) {
            const ubicacionExiste = await Ubicacion.findById(ubicacion);
            if (!ubicacionExiste) {
                return res.status(400).json({ error: "La ubicación especificada no existe" });
            }
        }

        const excursionActualizada = await Excursion.findByIdAndUpdate(
            req.params.id,
            { nombre, descripcion, ubicacion, duracion, precio, proveedor, idiomas, activo },
            { new: true, runValidators: true }
        ).populate('ubicacion');

        if (!excursionActualizada) {
            return res.status(404).json({ error: 'Excursión no encontrada' });
        }

        res.json(excursionActualizada);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar la excursión' });
    }
};

export const eliminarExcursion = async (req, res) => {
    try {
        const excursionEliminada = await Excursion.findByIdAndDelete(req.params.id);
        if (!excursionEliminada) {
            return res.status(404).json({ error: 'Excursión no encontrada' });
        }
        res.json({ mensaje: 'Excursión eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar la excursión' });
    }
};