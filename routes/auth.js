/*
    
    RUTA: /api/auth

*/

//las rutas se obtienes del servidor express
const { Router } = require('express');
const { login, googleSignIn } = require('../controllers/auth');
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


//para logrear se hace con POST
router.post( '/google', [
    check('token','El token de google es Obligatorio').not().isEmpty(),
    validarCampos
    ], googleSignIn 
);

//para exportar la ruta
module.exports = router;

