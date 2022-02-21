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
    
    const id = req.params.id;
    const uid = req.uid;   //viene del middleware validacionJWT
    try {
        //1ro revidsar si existe el id
        const hospital = await Hospital.findById( id);
        if(!hospital){
            return res.status(404).json({
                ok:false,
                msg:"Hospital no encontrado por Id"
            });
        }

        //1ra forma
        //hospital.nombre = req.body.nombre;
        
        //2da forma
        const cambiosHospital = {
            ...req.body,
            uid    
        }

        //new:true, es para forzar actualizacion
        const hospitalActualizado = await Hospital.findByIdAndUpdate(id, cambiosHospital, {new:true});

        res.json({
            ok:true,
            hospitalActualizado
        });
            
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el Administrador.'
    
        });

    }
}



const borrarHospital = async (req, res = response) => {

    const id = req.params.id;
    const uid = req.uid;

    try {
        const hospital = Hospital.findById(id);
        if(!hospital){
            return res.status(404).json({
                ok: false,
                msg: "Hospital no encontrado por Id"
            });
        }

        await Hospital.findByIdAndDelete( id );

        res.json({
            ok: true,
            msg: "Hospital eliminado"
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