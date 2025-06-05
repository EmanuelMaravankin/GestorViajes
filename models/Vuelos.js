import mongoose from "mongoose";

const vueloSchema = mongoose.Schema({
    aerolinea: { type: String, required: true },
    origen: { type: mongoose.Schema.Types.ObjectId, ref: 'Ubicacion', required: true },
    destino: { type: mongoose.Schema.Types.ObjectId, ref: 'Ubicacion', required: true },
    fechaHoraSalida: { type: Date, required: true },
    fechaHoraLlegada: { type: Date, required: true },
    costo: { type: Number, required: true },
    asientosDisponibles: { type: Number, required: true },
    activo: { type: Boolean, default: true }
}, { timestamps: true })

export default mongoose.model("Vuelos", vueloSchema) 