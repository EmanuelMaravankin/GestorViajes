import Reserva from "../models/Reserva.js";
import Cliente from "../models/Cliente.js";
import Paquete from "../models/paquete.js";
import mongoose from "mongoose";


export const CrearReserva = async (req, res) =>{
    const{clienteID,paqueteID,estado,fechaReserva,montoTotal,pagoID} = req.body;
    if(!clienteID || !paqueteID || !estado || !fechaReserva || !montoTotal || !pagoID){
        return res.status(400).json({error: "Faltan datos"});
    }

  if (!mongoose.Types.ObjectId.isValid(clienteID) || !mongoose.Types.ObjectId.isValid(paqueteID)) {
    return res.status(400).json({ error: "ID de cliente o paquete inválido" });
  }

     if (typeof montoTotal !== "number" || montoTotal <= 0) {
  return res.status(400).json({ error: "Monto total inválido" });
}
  
    const clienteExiste = await Cliente.findById(clienteID);
    if(!clienteExiste){
        return res.status(400).json({error:"No se encontro el cliente"})
    }
     
    /*const paqueteExiste = await Paquete.findById(paqueteID);
    if(!paqueteExiste){
        return res.status(400).json({error:"No se encontro el paquete"})
    }*/

    if(!["Pendiente", "Confirmada", "Cancelada"].includes(estado)){
    return res.status(400).json({error: "El estado ingresado solo puede ser: Pendiente, Confirmada o Cancelada"})
    }


    const reserva = {
        clienteID,
        paqueteID,
        estado,
        montoTotal,
        fechaReserva: new Date(fechaReserva)
    };


      try {
            const nuevaReserva = await Reserva.create(reserva)
              clienteExiste.historialReservas.push(nuevaReserva._id);
            await clienteExiste.save();
            res.status(201).json(nuevaReserva)
        } catch (error) {
            res.status(500).json({error: "Error al crear Reserva"})
        }
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
    const { clienteID, paqueteID, estado, fechaReserva, montoTotal,pagoID } = req.body;

      if (typeof montoTotal !== "number" || montoTotal <= 0) {
  return res.status(400).json({ error: "Monto total inválido" });
}

      if (!["Pendiente", "Confirmada", "Cancelada"].includes(estado)) {
        return res.status(400).json({ error: "Estado inválido" });
    }
    
    try {
        const reservaActualizada = await Reserva.findByIdAndUpdate(
            req.params.id,
            { clienteID, paqueteID, estado, fechaReserva,montoTotal,pagoID  },
            { new: true, runValidators: true }
        );


         if (!reservaActualizada) {
            return res.status(404).json({ error: 'Reserva no encontrada' });
        }

        res.json(reservaActualizada);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el reserva' });
    }
}

