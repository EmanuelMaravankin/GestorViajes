import mongoose from "mongoose";

const ubicacionSchema = mongoose.Schema({
    nombre: { type: String, required: true },
    pais: { type: String, required: true },
    ciudad: { type: String, required: true },
    codigoPostal: { type: String, required: false }
}, { timestamps: true });

export default mongoose.model("Ubicacion", ubicacionSchema);