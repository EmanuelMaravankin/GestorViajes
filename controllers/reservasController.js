import Reserva from "../models/Reserva.js";
import Cliente from "../models/Cliente.js";
import Paquete from "../models/Paquete.js";

export const CrearReserva = async (req, res) =>{
    const{clienteID,paqueteID,estado,fechaReserva,montoTotal,pagoID} = req.body;
    if(!clienteID || !paqueteID || !estado || !fechaReserva || !montoTotal || !pagoID){
        return res.status(400).json({error: "Faltan datos"})
    }
}

  if (
    !mongoose.Types.ObjectId.isValid(clienteID) ||
    !mongoose.Types.ObjectId.isValid(paqueteID)
  ) {
    return res.status(400).json({ error: "ID de cliente o paquete inválido" });
  }

  
    const clienteExiste = await Cliente.findById(clieneteID);
    if(!clienteExiste){
        return res.status(400).json({error:"No se encontro el cliente"})
    }
     
    const paqueteExiste = await Paquete.findById(paqueteID);
    if(!paqueteExiste){
        return res.status(400).json({error:"No se encontro el paquete"})
    }

    const reserva = {
        clienteID,
        paqueteID,
        estado,
        montoTotal,
        fechaReserva: new Date()
    };


      try {
            const nuevaReserva = await Reserva.create(reserva)
            res.status(201).json(nuevaReserva)
        } catch (error) {
            res.status(500).json({error: "Error al crear Reserva"})
        }
        

export const getReservas = async (req, res) => {
    try {
        const reservas = await Reserva.find()
        res.json(reservas)
    } catch (error) {
        res.status(500).json({error: "Error al obtener reservas"})
    }
}

export const eliminarReserva = async (req, res) => {
    try {
        const reservaEliminada = await Reserva.findByIdAndDelete(req.params.id);
        if (!reservaEliminada) {
            return res.status(404).json({ error: 'Reserva no encontrado' });
        }
        res.json({ mensaje: 'Reserva eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el reserva' });
    }
}

export const actualizarReserva = async (req, res) => {
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

         if (!clienteActualizado) {
            return res.status(404).json({ error: 'Cliente no encontrado' });
        }

        res.json(clienteActualizado);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el cliente' });
    }
}

