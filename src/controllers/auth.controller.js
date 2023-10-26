const { response } = require('express');
const bcrypt = require('bcryptjs');

const { generarJWT } = require('../helpers/jwt');

const Usuario = require('../models/Usuario');


const crearUsuario = async (req, res = response) => {
    const { password, email } = req.body

    try {

        let usuario = await Usuario.findOne({ email });

        if (usuario) {
            return res.status(400).json({
                ok: true,
                msg: 'ERROR: Correo ya existe',
            });
        }

        usuario = new Usuario(req.body);

        //Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        await usuario.save();

        //Generar JWT
        const token = await generarJWT(usuario.id, usuario.name);

        res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        })


    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'ERROR: Ocurrio un error al crear usuario',
        })
    }

}

const loginUsuario = async (req, res = response) => {
    const { password, email } = req.body;

    try {
        const usuario = await Usuario.findOne({ email });
        if (!usuario) {
            return res.status(400).json({
                ok: true,
                msg: 'ERROR: Usuario o contraseña incorrectos',
            });
        }

        //confirmar password
        const validPassword = bcrypt.compareSync(password, usuario.password);

        if (!validPassword) {
            return res.status(401).json({
                ok: true,
                msg: 'ERROR: Contraseña incorrecta',
            });
        }


        //Generar Nuestro JWT
        const token = await generarJWT(usuario.id, usuario.name);




        res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        })



    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'ERROR: Ocurrio un error al loggear usuario',
        })
    }
}

const revalidadToken = async (req, res = response) => {

    const { uid, name } = req;

    //generar un nuevo JWT

    const token = await generarJWT(uid, name);

    res.json({
        ok: true,
        token

    })
}

module.exports = {
    crearUsuario,
    loginUsuario,
    revalidadToken
}