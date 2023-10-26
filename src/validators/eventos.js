const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { isDate } = require('../helpers/isDate');



const validatorCrearEvento = [
    check("title", 'El nombre es obligatorio')
        .notEmpty()
        .isLength(
            {
                min: 3,
                max: 900
            }
        ),
    check("start", 'Fecha de inicio es obligatoria').custom(isDate),
    check("end", 'Fecha de finalizacion es obligatoria').custom(isDate),


    validarCampos
];


module.exports = {
    validatorCrearEvento,
}