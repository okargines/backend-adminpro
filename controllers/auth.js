const { response } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');

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


//module.exports = getUsuarios;  //retorna un metodo general
module.exports = {             //para retornar varaios metodos
        login  
    }