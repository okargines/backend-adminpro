const jwt = require('jsonwebtoken');


const generarJWT = ( uid ) => {

    return new Promise ((resolve, reject) => {

        const payload = {
            uid,
        };
    
        //el metodo sign de jwt devuelve un VOID pero se convertira
        //en una promesa para usarlo con await en el controller auth.    
        jwt.sign(payload, process.env.JWT_SECRET,{
                expiresIn: '12h'
            },( err, token ) => {
                if(err){
                    console.log(err);
                    reject ('No se pudo generar Token');
                }else{
                    console.log(token);
                    resolve(token);
                }
        });
    
    });
}

module.exports = {
    generarJWT
}

