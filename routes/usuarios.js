/*
    
    RUTA: /api/usuarios

*/

//funciones/metodos del servicio express
const { Router } = require('express');
const { check } = require('express-validator');

//controlador usuario.
const { getUsuarios, crearUsuario, actualizarUsuario, borrarUsuario } = require('../controllers/usuarios');

//middleware - validaciones
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

//Declaracion de la variable router para los EndPoint
const router = Router();


/******************************************************* */
//SECCION END POINT
/******************************************************* */
router.get( '/', validarJWT, getUsuarios );

router.post( '/', [
    validarJWT,
    check('nombre','el nombre es Obligatorio').not().isEmpty(),
    check('password','El password es Obligatorio').not().isEmpty(),
    check('email','El email es Obligatorio').isEmail(),
    validarCampos
    ], crearUsuario );


router.put( '/:id', [
    validarJWT,
    check('nombre','el nombre es Obligatorio').not().isEmpty(),
    check('email','El email es Obligatorio').isEmail(),
    check('role','El role Obligatorio').not().isEmpty(),
], actualizarUsuario );


router.delete( '/:id', validarJWT, borrarUsuario );



//para exportar la ruta
module.exports = router;

