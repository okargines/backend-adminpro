const {response} = require('express');
const Medico = require('../models/medico');
const { generarJWT } = require('../helpers/jwt');


const getMedicos = async (req, res = response) => {

    const medicos = await Medico.find()
                        .populate('usuario', 'nombre img')    
                        .populate('hospital', 'nombre')

    res.json({
        ok: true,
        medicos
    });
}

const crearMedico =  async (req, res = response) => {

    const uid = req.uid;
    const medico = new Medico ({
        usuario: uid,   //para agregar al modelo medico el usuario authenticado
        ...req.body
        });

    try {

       const medicoDB = await medico.save();

        res.json({
            ok: true,
            medico: medicoDB
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el Administrador'
        });
    }    
}


const actualizarMedico = async (req, res = response) => {

    try {

        res.json({
            ok:true,
            msg: "Actualizar Medico"
        });
            
    } catch (error) {
        console.log(error);
            res.status(500).json({
                ok: false,
                msg: 'Error inesperado.'
        
            });

    }
}



const borrarMedico = async (req, res = response) => {

    try {
        
        res.json({
            ok:true,
            msg: "Borrar Medico"
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
        getMedicos,  
        crearMedico,
        actualizarMedico,
        borrarMedico
    }