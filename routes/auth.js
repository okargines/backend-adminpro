/*
    
    RUTA: /api/login

*/

//las rutas se obtienes del servidor express
const { Router } = require('express');
const { login, googleSignIn, renewToken } = require('../controllers/auth');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const router = Router();


//Usando patron usuario y password
//para logrear se hace con POST
router.post( '/', [
    check('email','El email es Obligatorio').isEmail(),
    check('password','El password es Obligatorio').not().isEmpty(),
    validarCampos
    ], login 
);

//Usando patron de GOOGLE.
//para logrear se hace con POST
router.post( '/google', [
    check('token','El token de google es Obligatorio').not().isEmpty(),
    validarCampos
    ], googleSignIn 
);

router.get( '/renew', 
    validarJWT, 
    renewToken 
);

//para exportar la ruta
module.exports = router;

