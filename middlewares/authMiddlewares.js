n
import jwt from "jsonwebtoken"

export const protegerRuta = (req, res, next ) =>{

    const authHeader = req.headers.authorization

        console.log("AuthHeader: ", authHeader);
    

    if(!authHeader?.startsWith('Bearer ')){
        return res.status(401).json({error: "Token no proporcionado"})
    }

    const token = authHeader.split(" ")[1]

    console.log("token: ", token);

    try {
        
        const decodificado = jwt.verify(token, process.env.JWT_SECRET)

        console.log("decodificado: ", decodificado);

        req.cliente = decodificado;
       
        next()

    } catch (error) {
        return res.status(403).json({ error: 'Token invalido o expirado'})
    }

}

export const protegerRutaAdmin = (req, res, next) => {
  
    const authHeader = req.headers.authorization

    console.log("AuthHeader: ", authHeader);
    

    if(!authHeader?.startsWith('Bearer ')){
        return res.status(401).json({error: "Token no proporcionado"})
    }
    
    const token = authHeader.split(" ")[1]

    console.log("token: ", token);

    try {
        
        const decodificado = jwt.verify(token, process.env.JWT_SECRET)

        console.log("decodificado: ", decodificado);


        req.cliente = decodificado;

        if(req.cliente.rol !== 'admin'){
            return res.status(401).json({ error: 'No eres admin'})

        }
       
        next()

    } catch (error) {
        return res.status(403).json({ error: 'Token invalido o expirado'})
    }
}

