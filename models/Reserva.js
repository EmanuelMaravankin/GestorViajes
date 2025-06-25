import mongoose from "mongoose";

const reservaSchema = new mongoose.Schema({
  clienteID: { type: mongoose.Schema.Types.ObjectId, ref: "Cliente", required: true },
  paqueteID: { type: mongoose.Schema.Types.ObjectId, ref: "Paquete", required: true },
  estado: { type: String, required: true},
  fechaReserva: { type: Date, default: Date.now },
  montoTotal: { type: Number, required: true },
  pagoID: [{ type: mongoose.Schema.Types.ObjectId, ref: "Pago" }]
}, { timestamps: true });

export default mongoose.model("Reserva", reservaSchema)