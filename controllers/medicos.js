const {response} = require('express');
const Medico = require('../models/medico');
const { generarJWT } = require('../helpers/jwt');


const getMedicos = async (req, res = response) => {

    const medicos = await Medico.find()
                        .populate('usuario', 'nombre img')    
                        .populate('hospital', 'nombre img')

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
    
    const id = req.params.id;
    const uid = req.uid;

    try {
        const medico = await Medico.findById(id);
        if(!medico){
            return res.status(404).json({
               ok: false,
               msg: "El medico no existe por Id"     
            });
        }

        const actualizarMedico = {
            ...req.body,
            uid
        }

        const medicoActualizado = await Medico.findByIdAndUpdate(id, actualizarMedico, {new:true});

        res.json({
            ok:true,
            medicoActualizado
        });
            
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}



const borrarMedico = async (req, res = response) => {
    const id = req.params.id;

    try {
        const medico = await Medico.findById(id);    
        if(!medico){
            return res.status(404).json({
               ok: false,
               msg: "El medico no existe por Id"     
            });
        }
        await Medico.findByIdAndDelete(id);
        res.json({
            ok:true,
            msg: "Medico borrado"
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