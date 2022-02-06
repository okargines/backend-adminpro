/*
    
    RUTA: /api/auth

*/

//las rutas se obtienes del servidor express
const { Router } = require('express');
const { login } = require('../controllers/auth');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();



//para logrear se hace con POST
router.post( '/', [
    check('email','El email es Obligatorio').isEmail(),
    check('password','El password es Obligatorio').not().isEmpty(),
    validarCampos
    ], login 
);



//para exportar la ruta
module.exports = router;

