import mongoose from "mongoose";

const excursionSchema = mongoose.Schema({
    nombre: { type: String, required: true },
    descripcion: { type: String, required: false },
    ubicacion: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Ubicacion', 
        required: true 
    },
    duracion: { type: String, required: true },
    precio: { type: Number, required: true },
    proveedor: { type: String, required: false },
    idiomas: { type: [String], required: false },
    activo: { type: Boolean, required: true, default: true }
}, { timestamps: true });

export default mongoose.model("Excursion", excursionSchema);