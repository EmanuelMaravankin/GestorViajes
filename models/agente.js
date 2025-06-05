import mongoose from "mongoose";

const agenteSchema = mongoose.Schema({
    nombre: { type: String, required: true},
    email: { type: String, required: true},
    password: { type: String, required: true},
    telefono:{ type: String, required: false },
    clientesID: { type: [String], required: true},
    activo: { type: Boolean, default: true }
}, { timestamps: true})

export default mongoose.model("agente", agenteSchema)