const { response } = require('express');
const jwt = require('jsonwebtoken');
const validarJWT = (req, res = response, next) => {

    //Recibir el jwt en x-token en headers

    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'ERROR: No hay token en la peticion'
        })
    }

    try {

        const { uid, name } = jwt.verify(
            token,
            process.env.SECRET_JSW_SEED
        );

        req.uid = uid;
        req.name = name;

    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'ERROR: Token No Valido'
        })
    }


    next();

}

module.exports = {
    validarJWT
}