/*
    
    RUTA: /api/hospitales

*/

//funciones/metodos del servicio express
const { Router } = require('express');
const { check } = require('express-validator');

//controlador usuario.
const { getHospitales, crearHospital, actualizarHospital, borrarHospital } = require('../controllers/hospitales');

//middleware - validaciones
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

//Declaracion de la variable router para los EndPoint
const router = Router();


/******************************************************* */
//SECCION END POINT
/******************************************************* */
router.get( '/', [], getHospitales );

router.post( '/', [
    validarJWT,
    check('nombre','el nombre es Obligatorio').not().isEmpty(),
    validarCampos
    ], crearHospital );


router.put( '/:id', [
    validarJWT,
    check('nombre','el nombre es Obligatorio').not().isEmpty(),
    validarCampos
], actualizarHospital );


router.delete( '/:id', validarJWT, borrarHospital );



//para exportar la ruta
module.exports = router;

