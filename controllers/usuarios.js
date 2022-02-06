const {response} = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');


const getUsuarios = async (req, res = response) => {

    const usuarios = await Usuario.find({},'nombre email role google');  //todo los usuarios

    res.json({
        ok: true,
        usuarios,
        uid: req.uid   ///id del usario autenticado.
    });
}

const crearUsuario =  async (req, res = response) => {

    //console.log(req.body);
    const {email, password, nombre} = req.body;


    try {
        const existeEmail = await Usuario.findOne({email});
        
        if(existeEmail){
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya esta registrado'
            })    
        }        

        const usuario = new Usuario(req.body);

        //Para encriptar password
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);        

        await usuario.save();
    
        //Generar token
        const token = await generarJWT(usuario.id);

        res.json({
            ok: true,
            usuario,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        });
    }    
}


const actualizarUsuario = async (req, res = response) => {
    //const uid = req.body
    const uid = req.params.id;
        
    try {
        
        const usuarioDB = await Usuario.findById( uid );
        if(!usuarioDB)    {
            res.status(404).json({
                ok: false,
                msg: 'No existe un usuario por ese id'
            });
        }
        
        //Actualiza Usuaroip
        /*************************************/
        //destructurando req.body
        const { password, google, email, ...campos } = req.body;
    

        if(usuarioDB.email != email){
            //Buscar si existe el email antes de actyualizar params
            //personali<zar mensaje.
            const existeEmail = await Usuario.findOne({ email });
            if(existeEmail){
                res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un Usuario con ese Email'
                });
            }
        }

        campos.email = email;  //se asigna nuevmente al objeto campos.
        const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, {new: true}) ;
        //new:true, es para forzar que devuel el dato actualizado
        /*************************************/

        // TODO: validar token y comprobar si es el usuario correcto.

        res.json({
            ok:true,
            usuario: usuarioActualizado
        });
            
    } catch (error) {
        console.log(error);
            res.status(500).json({
                ok: false,
                msg: 'Error inesperado.'
        
            });

    }
}



const borrarUsuario = async (req, res = response) => {
    //const uid = req.body
    const uid = req.params.id;
        
    try {
        
        const usuarioDB = await Usuario.findById( uid );
        if(!usuarioDB){
            res.status(404).json({
                ok: false,
                msg: 'No existe un usuario por ese id'
            });
        }
        
        await Usuario.findByIdAndDelete( uid );

        res.json({
            ok:true,
            msg: "Usuario Eliminado"
        });
            
    } catch (error) {
        console.log(error);
            res.status(500).json({
                ok: false,
                msg: 'hable con el Administrador'
        
            });

    }
}




//module.exports = getUsuarios;  //retorna un metodo general
module.exports = {             //para retornar varaios metodos
        getUsuarios,  
        crearUsuario,
        actualizarUsuario,
        borrarUsuario
    }