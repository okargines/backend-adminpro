/*
    
    RUTA: /api/todo

*/
const {Router} = require('express');
const {getTodo} = require('../controllers/busquedas');
const {validarJWT} = require('../middlewares/validar-jwt');

//Instanciacion router.
const router = Router();

router.get('/:busqueda', validarJWT, getTodo);




module.exports = router;