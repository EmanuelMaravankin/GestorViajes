import Pagos from "../models/Pagos.js";
import Usuario from "../models/Usuario.js";

export const home = (req, res) => {
    res.send(`<h1>Home de la API de Pagos</h1>`)
}

export const getPagos = async (req, res) => {
    try {
        const pagos = await Pagos.find()
            .populate('clienteID', 'nombre email')
            .populate('reservaID')
        res.json(pagos)
    } catch (error) {
        res.status(500).json({error: "Error al obtener pagos"})
    }
}

export const getPagosSearch = async (req, res) => {
    const {estado, medioPago, fechaInicio, fechaFin} = req.query;

    try {
        const query = {};
        
        if (estado) {
            query.estado = estado;
        }
        if (medioPago) {
            query.medioPago = medioPago;
        }
        if (fechaInicio && fechaFin) {
            query.fechaPago = {
                $gte: new Date(fechaInicio),
                $lte: new Date(fechaFin)
            };
        }

        const pagos = await Pagos.find(query)
            .populate('clienteID', 'nombre email')
            .populate('reservaID')
        res.json(pagos)
    } catch (error) {
        res.status(500).json({error: "Error al buscar pagos"})
    }
}

export const getPagosByCliente = async (req, res) => {
    try {
        const pagos = await Pagos.find({ clienteID: req.params.clienteId })
            .populate('clienteID', 'nombre email')
            .populate('reservaID')
        res.json(pagos)
    } catch (error) {
        res.status(500).json({error: "Error al obtener pagos del cliente"})
    }
}

export const getPagosByReserva = async (req, res) => {
    try {
        const pagos = await Pagos.find({ reservaID: req.params.reservaId })
            .populate('clienteID', 'nombre email')
            .populate('reservaID')
        res.json(pagos)
    } catch (error) {
        res.status(500).json({error: "Error al obtener pagos de la reserva"})
    }
}

export const eliminarPago = async (req, res) => {
    try {
        const pagoEliminado = await Pagos.findByIdAndDelete(req.params.id);
        if (!pagoEliminado) {
            return res.status(404).json({ error: 'Pago no encontrado' });
        }
        res.json({ mensaje: 'Pago eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el pago' });
    }
}

export const getPagoById = async (req, res) => {
    try {
        const pago = await Pagos.findById(req.params.id)
            .populate('clienteID', 'nombre email')
            .populate('reservaID')
        if(pago){
            res.json(pago)
        }else{
            res.status(404).json({ error: 'Pago no encontrado'})
        }
    } catch (error) {
        res.status(500).json({ error: "ID Invalido"})
    }
}

export const crearPago = async (req, res) => {  
    const { 
        reservaID, 
        clienteID, 
        monto, 
        fechaPago, 
        medioPago, 
        estado 
    } = req.body;

    if(!reservaID || !clienteID || !monto || !fechaPago || !medioPago){
        return res.status(400).json({error: "Faltan datos requeridos"})
    }

    
    if(monto <= 0) {
        return res.status(400).json({error: "El monto debe ser un número positivo"})
    }

    
    const clienteExiste = await Usuario.findById(clienteID);
    if(!clienteExiste) {
        return res.status(404).json({error: "Cliente no encontrado"})
    }

    const pago = {
        reservaID,
        clienteID,
        monto,
        fechaPago,
        medioPago,
        estado: estado || 'pendiente'
    }

    try {
        const nuevoPago = await Pagos.create(pago)
        const pagoCreado = await Pagos.findById(nuevoPago._id)
            .populate('clienteID', 'nombre email')
            .populate('reservaID')
        res.status(201).json(pagoCreado)
    } catch (error) {
        res.status(500).json({error: "Error al crear el pago"})
    }
}

export const actualizarPago = async (req, res) => {
    const { 
        monto, 
        fechaPago, 
        medioPago, 
        estado 
    } = req.body;

    try {
            if(monto && monto <= 0) {
            return res.status(400).json({error: "El monto debe ser un número positivo"})
        }

        const pagoActualizado = await Pagos.findByIdAndUpdate(
            req.params.id,
            { 
                monto, 
                fechaPago, 
                medioPago, 
                estado 
            },
            { new: true, runValidators: true }
        ).populate('clienteID', 'nombre email')
         .populate('reservaID');

        if (!pagoActualizado) {
            return res.status(404).json({ error: 'Pago no encontrado' });
        }

        res.json(pagoActualizado);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el pago' });
    }
} 