/*
    
    RUTA: /api/medicos

*/

//funciones/metodos del servicio express
const { Router } = require('express');
const { check } = require('express-validator');

//controlador usuario.
const { getMedicos, crearMedico, actualizarMedico, borrarMedico } = require('../controllers/medicos');

//middleware - validaciones
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

//Declaracion de la variable router para los EndPoint
const router = Router();


/******************************************************* */
//SECCION END POINT
/******************************************************* */
router.get( '/', [validarJWT], getMedicos );

router.post( '/', [
    validarJWT,
    check('nombre','El nombre es Obligatorio').not().isEmpty(),
    check('hospital','El hospital id debe ser valido').isMongoId(),
    validarCampos
    ], crearMedico );


router.put( '/:id', [
    validarJWT,
    check('nombre','el nombre es Obligatorio').not().isEmpty(),
    check('hospital','El nombre del hospital es Obligatorio').not().isEmpty(),
    validarCampos
], actualizarMedico );


router.delete( '/:id', validarJWT, borrarMedico );



//para exportar la ruta
module.exports = router;

