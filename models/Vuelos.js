import mongoose from "mongoose";

const vueloSchema = mongoose.Schema({
    aerolinea: { type: String, required: true },
    origen: { type: String, required: true },
    destino: { type: String, required: true },
    fechaHoraSalida: { type: Date, required: true },
    fechaHoraLlegada: { type: Date, required: true },
    costo: { type: Number, required: true },
    asientosDisponibles: { type: Number, required: true }
}, { timestamps: true })

export default mongoose.model("Vuelos", vueloSchema) 