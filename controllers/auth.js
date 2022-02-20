const { response } = require('express');
const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify');

const login = async (req, res = response) => {

    const {email, password} = req.body;
    

    try {
        const usuarioDB = await Usuario.findOne({email});

        //validar si el usuario exste/eemail.
        if(!usuarioDB){
            return res.status(400).json({
                ok:false,
                msg: "Email no encontrado"
            })
        }
        
        //comparar contraaseña
        const validPassword = bcrypt.compareSync(password, usuarioDB.password);
        if(!validPassword) {
            return res.status(400).json({
                ok:false,
                msg: "Contraseña invalida"
            })
        }   

        //ESTA FUNCION REGRESA UNA PROMESA
        //Generar Token    
        const token = await generarJWT(usuarioDB.id);


        res.json({
            ok: true,
            msg: token
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Habla con el Administrador"
        })        
    }
}

const googleSignIn = async (req, res = response) => {

    const googleToken = req.body.token;

    try {

        //buscar usuario con el emaiul.
        //Si no existe usuario crear uno nuevo.
        //Si existe modificar flag de google. a true.
        //guardar el modelo usuario.
        const { name, email, picture } = await googleVerify(googleToken);
        const usuarioDB =  await Usuario.findOne( { email } );
        let usuario;
        if (!usuarioDB){
            usuario = new Usuario({
                nombre: name,
                email,
                password: '@@@',
                img: picture,
                google: true
            });
        }else{
            usuario = usuarioDB;
            usuario.google = true;
        };
        // //user: root
        // //password de mongodb:
        // //8KKMn7Q0Xqgsx8de  nuevo
        // //V19tlRzc2Lu4MLjf  antiguo

        await usuario.save();

        //Generar Token    

        const token = await generarJWT(usuario.id);

        res.json({
            ok: true,
            token,
            id: usuario.id,
            //usuario
        });

    } catch (error) {
        res.status(401).json({
            ok: false,
            msg: "Token no es correcto",
            error
        });
        
    }
}    

//module.exports = getUsuarios;  //retorna un metodo general
module.exports = {             //para retornar varaios metodos
        login,
        googleSignIn  
    }