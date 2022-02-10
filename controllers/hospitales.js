const {response} = require('express');
const Hospital = require('../models/hospital');
const { generarJWT } = require('../helpers/jwt');


const getHospitales = async (req, res = response) => {

    const hospitales = await Hospital.find()
                            .populate('usuario', 'nombre img');  

    res.json({
        ok: true,
        hospitales
    });
}

const crearHospital =  async (req, res = response) => {

    const uid = req.uid;  //viene del middleware
    const hospital = new Hospital({ 
        usuario:uid,  //aqui se esta enviando el usuario autenticado
        ...req.body
    });

    try {

        const hospitalDB = await hospital.save();

        res.json({
            ok: true,
            hospital: hospitalDB
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el Administrador'
        });
    }    
}


const actualizarHospital = async (req, res = response) => {

    try {

        res.json({
            ok:true,
            msg: "Actualizar Hospital"
        });
            
    } catch (error) {
        console.log(error);
            res.status(500).json({
                ok: false,
                msg: 'Error inesperado.'
        
            });

    }
}



const borrarHospital = async (req, res = response) => {

    try {
        
        res.json({
            ok:true,
            msg: "Borrar Hospital"
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
        getHospitales,  
        crearHospital,
        actualizarHospital,
        borrarHospital
    }