const { Router } = require('express');
const router = Router();


// ** middlewares
const { validarJWT } = require('../middlewares/validar-jwt');

// ** controllers
const { getEventos, crearEvento, actualizarEvento, eliminarEvento } = require('../controllers/events.controller');
const { validatorCrearEvento } = require('../validators/eventos');
// Obtener eventos


router.use(validarJWT)
router.get('/', getEventos);


//crear nuevo evento
router.post('/', validatorCrearEvento, crearEvento);


//actualizar evento
router.put('/:id', validatorCrearEvento, actualizarEvento);


// borrar evento
router.delete('/:id', eliminarEvento);


module.exports = router;
