import mongoose from "mongoose";

const paqueteSchema = mongoose.Schema({
    nombre: { type: String, required: true},
    vueloID: { type: String, required: true},
    hotelID: { type: String, required: true},
    excursionesID: { type: [String], required: true},
    seguroID: { type: String, required: true},
    ubicacionID: { type: String, required: true},
    precio:{ type: Number, required: true },
    duracion: { type: String, required: true}
}, { timestamps: true})

export default mongoose.model("paquete", paqueteSchema)