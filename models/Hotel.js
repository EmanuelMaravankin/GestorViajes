import mongoose from "mongoose";

const hotelSchema = mongoose.Schema({
    nombre: { type: String, required: true },
    ubicacion: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Ubicacion', 
        required: true 
    },
    direccion: { type: String, required: true },
    estrellas: { 
        type: Number, 
        required: true,
        min: 1,
        max: 5
    },
    servicios: { type: [String], required: false },
    precioPorNoche: { type: Number, required: true }
}, { timestamps: true });

export default mongoose.model("Hotel", hotelSchema);