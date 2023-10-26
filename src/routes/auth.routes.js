const { Router } = require('express');
const router = Router();

// ** express validator
const { check } = require('express-validator');

// ** Controllers
const { crearUsuario, loginUsuario, revalidadToken } = require('../controllers/auth.controller');
const { validatorCrearUsuario, validatorLoginUsuario } = require('../validators/auth');
const { validarJWT } = require('../middlewares/validar-jwt');

router.post('/new', validatorCrearUsuario, crearUsuario)


router.post('/', validatorLoginUsuario, loginUsuario)


router.get('/renew', validarJWT, revalidadToken)

module.exports = router;