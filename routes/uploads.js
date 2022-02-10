const {Router} = require('express');
const expressFileUpload = require('express-fileupload');


const { fileUpload, retornaImagen } = require('../controllers/uploads');
const { validarJWT } = require('../middlewares/validar-jwt');


//instancia del Router
const router = Router();

// default options - middleware
router.use(expressFileUpload());

//rutas
router.get ('/:tipo/:foto', validarJWT, retornaImagen);
router.put ('/:tipo/:id', validarJWT, fileUpload);


module.exports = router;




