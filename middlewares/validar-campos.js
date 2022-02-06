const { response } = require('express');
const { validationResult } = require('express-validator');

const validarCampos = (req, res = response, next) => {
        
    //obtiene los errores de "req"
    const errores = validationResult(req);
    if ( !errores.isEmpty() ) {
        return res.status(400).json({
            ok: false,
            errors: errores.mapped(),
        });    
    }

    //cuando llegue  este nivel es por todo esta bien y debe continuar
    next();
}

module.exports = {
    validarCampos
}

