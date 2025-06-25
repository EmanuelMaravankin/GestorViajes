import mongoose from "mongoose";

const clienteSchema = mongoose.Schema({
    nombre: { type: String, required: true},
    fechaNacimiento: { type: Date, required: true },
    telefono:{ type: String, required: true , unique: true},
    email: { type: String, required: true, unique: true},
    pasaporte: { type: String, required: true },
    password: { type: String, required: true},
    profile_pic: { type: String},
    historialReservas: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Reserva' }] }, { timestamps: true})

export default mongoose.model("Cliente", clienteSchema)