import Paquete from "../models/paquete.js";

export const getPaquetes = async (req, res) => {
    try {
        const paquetes = await Paquete.find();
        res.json(paquetes);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener paquetes" });
    }
};

export const getPaqueteById = async (req, res) => {

    try {
        const paquete = await Paquetes.findById(req.params.id)
        if(paquete){
            res.json(paquete)
        }else{
            res.status(404).json({ error: 'Paquetes no encontrado'})
        }
    } catch (error) {
        res.status(500).json({ error: "ID Invalido"})
    }

}

export const getPaquetesSearch = async (req, res) => {

  const { paquete } = req.query;

  if (!paquete) {
    return res.status(400).json({ error: "Falta el parámetro 'agente'" });
  }

  const escapeRegex = (text) => {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
  };

    const regex = new RegExp(`^${escapeRegex(paquete)}`, 'i');

  try {

    const paquetes = await Paquete.find({
      nombre: { $regex: regex }
    })
    res.json(paquetes)
  } catch (error) {
    res.status(500).json({ error: "Error al obtener paquetes" })
  }
}

export const crearPaquete = async (req, res) => {
    const { nombre, vueloID, hotelID, excursionesID, seguroID, ubicacionID, precio, duracion } = req.body;

    if (!nombre || !vueloID || !hotelID || !excursionesID || !seguroID || !ubicacionID || !precio || !duracion) {
        return res.status(400).json({ error: "Faltan datos" });
    }

    const nuevo = {
        nombre,
        vueloID,
        hotelID,
        excursionesID,
        seguroID,
        ubicacionID,
        precio,
        duracion
    };

    try {
        const nuevoPaquete = await Paquete.create(nuevo);
        res.status(201).json(nuevoPaquete);
    } catch (error) {
        res.status(500).json({ error: "Error al crear paquete" });
    }
};

export const actualizarPaquete = async (req, res) => {
    const { nombre, vueloID, hotelID, excursionesID, seguroID, ubicacionID, precio, duracion } = req.body;

    try {
        const paqueteActualizado = await Paquete.findByIdAndUpdate(
            req.params.id,
            { nombre, vueloID, hotelID, excursionesID, seguroID, ubicacionID, precio, duracion },
            { new: true, runValidators: true }
        );

        if (!paqueteActualizado) {
            return res.status(404).json({ error: 'Paquete no encontrado' });
        }

        res.json(paqueteActualizado);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el paquete' });
    }
};

export const eliminarPaquete = async (req, res) => {
    try {
        const paqueteEliminado = await Paquete.findByIdAndDelete(req.params.id);
        if (!paqueteEliminado) {
            return res.status(404).json({ error: 'Paquete no encontrado' });
        }
        res.json({ mensaje: 'Paquete eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el paquete' });
    }
};