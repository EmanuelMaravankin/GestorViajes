import mongoose from "mongoose";

const pagosSchema = mongoose.Schema({
    reservaID: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Reserva' },
    clienteID: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Cliente' },
    monto: { type: Number, required: true },
    fechaPago: { type: Date, required: true },
    medioPago: { 
        type: String, 
        required: true,
        enum: ['tarjeta', 'efectivo', 'transferencia', 'otro']
    },
    estado: { 
        type: String, 
        required: true,
        enum: ['pendiente', 'completado', 'cancelado', 'reembolsado'],
        default: 'pendiente'
    }
}, { timestamps: true })

export default mongoose.model("Pagos", pagosSchema) 