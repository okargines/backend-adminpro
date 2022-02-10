
const fs = require('fs');

//import * as fs from 'fs';


const Usuario = require('../models/usuario');
const Medico = require('../models/medico');
const Hospital = require('../models/hospital');

const borrarImagen = (path) => {
    if (fs.existsSync(path)){
    //     //borrar uuid de la ruta medico
         fs.unlinkSync(path);
    }
}

const actualizarImagen = async (tipo, id, path, uuidNombreFile) => {
    let pathUuidViejo = '';
    switch (tipo) {
        case 'medicos':
            //validar si id medico existe.
            const medico = await Medico.findById(id);
            if(!medico){
                console.log('id de Medico no existe');
                return false;
            }
            //Borrar pathUuidviejo
            pathUuidViejo = `${path}${medico.img}`;
            //borrarImagen(pathUuidViejo);

            //asignar nombrefile al atributo img del medico.
            medico.img = uuidNombreFile;
            //guardar la imagen del medico.
            await medico.save();
            return true;

        break;
        case 'hospitales':
            //validar si id usuario existe.
            const hospital = await Hospital.findById(id);
            if(!hospital){
                console.log('id de hospital no existe');
                return false;
            }
            //Borrar pathUuidviejo
            pathUuidViejo = `${path}${hospital.img}`;
            borrarImagen(pathUuidViejo);
            //Asignar nombrefile al atributo img del medico.
            //Guardar la imagen del hospital.
            hospital.img = uuidNombreFile;
            await hospital.save();
            return true;
        break;
        case 'usuarios':
            //validar si id usuario existe.
            const usuario = await Usuario.findById(id);
            if(!usuario){
                console.log('id de usuario no existe');
                return false;
            }
            //Borrar pathUuidviejo
            pathUuidViejo = `${path}${usuario.img}`;
            borrarImagen(pathUuidViejo);
            //Asignar nombrefile al atributo img del medico.
            //Guardar la imagen del usuario.
            usuario.img = uuidNombreFile;
            await usuario.save();
            return true;

            break;            
        default:
            break;
    }
    
}

module.exports = {
    actualizarImagen
}


