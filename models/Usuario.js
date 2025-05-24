import mongoose from "mongoose";

const usuarioSchema = mongoose.Schema({
    nombre: { type: String, required: true},
    fechaNacimiento: { type: Date, required: true },
    telefono:{ type: String, required: false },
    email: { type: String, required: true},
    password: { type: String, required: true}
}, { timestamps: true})

export default mongoose.model("Usuario", usuarioSchema)