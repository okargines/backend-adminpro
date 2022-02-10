//controllador
const path = require ('path');
const fs = require('fs');

const { response, request } = require('express');
const { v4:uuidv4 } = require ('uuid');
const { actualizarImagen } = require('../helpers/actualizar-imagen');

//Metodos
const fileUpload = ((req = request, res = response)=> {

    //Recepcion de parametros de entrada
    const tipo = req.params.tipo;
    const id = req.params.id;
    //Validacion de parametros de entrada
    const tiposValidos = ['usuarios','medicos','hopitales'];
    if(!tiposValidos.includes(tipo)){
        return res.status(400).json({
            ok:false,
            msg: "tipo invalido"
        });
    }
    //la variable [req.files] viene del middlewares
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok:false,
            msg: 'No files ware upload'
        });
    }
    
    const file = req.files.imagen;
    const nombreCortado = file.name.split('.');
    const extencionArchivo = nombreCortado[nombreCortado.length - 1];
    const extencionesValidas = ['jpg','png','jpeg','gif'];
    if(!extencionesValidas.includes(extencionArchivo)){
        return res.status(400).json({
            ok:false,
            msg: 'Extencion del archivo No valido'
        });
    }
    //Genera el identificador unico para nombreFile.
    //const uuidNombreFile = uuidv4() . extencionArchivo; //genera uuid par el 
    const uuidNombreFile = `${ uuidv4() }.${extencionArchivo}`; //genera uuid para el nombre archivo
    
    //path para guardar imjagen
    const path = `./uploads/${tipo}/`;
    const pathFile = `${path}${uuidNombreFile}`;
    //Para mover el file al servidor
    file.mv(pathFile, (err) => {
        if (err){
            return res.status(500).json({
                ok: false,
                msg: 'Error al mover la imagen'
            });
        }
    });

    //acxtualizar base de d datos
    actualizarImagen(tipo, id, path, uuidNombreFile);

    
    res.json({
        ok: true,
        msg: 'file upload',
        file: file.name,
        path,
        pathFile,
        uuidNombreFile
    });
});


const retornaImagen = (req, res = response) => {
    const tipo = req.params.tipo;
    const foto = req.params.foto;

    const pathImagen = path.join(__dirname, `../uploads/${tipo}/${foto}`);
    //imagen por defecto
    if(fs.existsSync(pathImagen)){
        res.sendFile(pathImagen);
    }else{
        const pathImagen = path.join(__dirname, `../uploads/noimagen.jpg`);
        res.sendFile(pathImagen);
    }

    // res.json({
    //     ok: true,
    //     msg: 'retornaImagen',
    // });
}

module.exports={
    fileUpload,
    retornaImagen
}





