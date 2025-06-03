import Hotel from "../models/Hotel.js";
import Ubicacion from "../models/Ubicacion.js";

export const getHoteles = async (req, res) => {
    try {
        const { ubicacion } = req.query;
        let filtro = {};
        
        if (ubicacion) {
            filtro.ubicacion = ubicacion;
        }
        
        const hoteles = await Hotel.find(filtro).populate('ubicacion');
        res.json(hoteles);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener hoteles" });
    }
};

export const getHotelById = async (req, res) => {
    try {
        const hotel = await Hotel.findById(req.params.id).populate('ubicacion');
        if (hotel) {
            res.json(hotel);
        } else {
            res.status(404).json({ error: 'Hotel no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: "ID Inválido" });
    }
};

export const crearHotel = async (req, res) => {
    const { nombre, ubicacion, direccion, estrellas, servicios, precioPorNoche } = req.body;
    
    if (!nombre || !ubicacion || !direccion || !estrellas || !precioPorNoche) {
        return res.status(400).json({ 
            error: "Faltan datos requeridos: nombre, ubicación, dirección, estrellas y precio por noche son obligatorios" 
        });
    }

    // Validar que las estrellas estén en el rango correcto
    if (estrellas < 1 || estrellas > 5) {
        return res.status(400).json({ 
            error: "Las estrellas deben estar entre 1 y 5" 
        });
    }

    // Validar que el precio sea positivo
    if (precioPorNoche <= 0) {
        return res.status(400).json({ 
            error: "El precio por noche debe ser mayor a 0" 
        });
    }

    try {
        // Verificar que la ubicación existe
        const ubicacionExiste = await Ubicacion.findById(ubicacion);
        if (!ubicacionExiste) {
            return res.status(400).json({ error: "La ubicación especificada no existe" });
        }

        const hotel = {
            nombre,
            ubicacion,
            direccion,
            estrellas,
            servicios,
            precioPorNoche
        };

        const nuevoHotel = await Hotel.create(hotel);
        const hotelConUbicacion = await Hotel.findById(nuevoHotel._id).populate('ubicacion');
        res.status(201).json(hotelConUbicacion);
    } catch (error) {
        res.status(500).json({ error: "Error al crear hotel" });
    }
};

export const actualizarHotel = async (req, res) => {
    const { nombre, ubicacion, direccion, estrellas, servicios, precioPorNoche } = req.body;

    // Validaciones opcionales para actualización
    if (estrellas && (estrellas < 1 || estrellas > 5)) {
        return res.status(400).json({ 
            error: "Las estrellas deben estar entre 1 y 5" 
        });
    }

    if (precioPorNoche && precioPorNoche <= 0) {
        return res.status(400).json({ 
            error: "El precio por noche debe ser mayor a 0" 
        });
    }

    try {
        // Si se está actualizando la ubicación, verificar que existe
        if (ubicacion) {
            const ubicacionExiste = await Ubicacion.findById(ubicacion);
            if (!ubicacionExiste) {
                return res.status(400).json({ error: "La ubicación especificada no existe" });
            }
        }

        const hotelActualizado = await Hotel.findByIdAndUpdate(
            req.params.id,
            { nombre, ubicacion, direccion, estrellas, servicios, precioPorNoche },
            { new: true, runValidators: true }
        ).populate('ubicacion');

        if (!hotelActualizado) {
            return res.status(404).json({ error: 'Hotel no encontrado' });
        }

        res.json(hotelActualizado);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el hotel' });
    }
};

export const eliminarHotel = async (req, res) => {
    try {
        const hotelEliminado = await Hotel.findByIdAndDelete(req.params.id);
        if (!hotelEliminado) {
            return res.status(404).json({ error: 'Hotel no encontrado' });
        }
        res.json({ mensaje: 'Hotel eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el hotel' });
    }
};