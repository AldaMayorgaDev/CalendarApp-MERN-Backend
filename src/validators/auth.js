const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');


const validatorCrearUsuario = [
    check("name", 'El nombre es obligatorio')
        .notEmpty()
        .isLength(
            {
                min: 3,
                max: 90
            }
        ),
    check("password", 'El password debe ser de 6 caracteres').notEmpty().isLength({ min: 3, max: 15 }),
    check("email", 'El email es obligatorio').notEmpty().isEmail(),

    validarCampos
];

const validatorLoginUsuario = [
    check("password", 'El password debe ser de 6 caracteres').notEmpty().isLength({ min: 3, max: 15 }),
    check("email", 'El email es obligatorio').notEmpty().isEmail(),

    validarCampos
];

module.exports = {
    validatorCrearUsuario,
    validatorLoginUsuario
}