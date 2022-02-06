//crear modelos

const { Schema, model } = require ('mongoose');

const UsuarioSchema = Schema({

        nombre: {
            type : String,
            required: true,
            unique: true   
        },
        email:{
            type : String,
            required: true,
        },
        password: {
            type : String,
            required: true,
        },
        img:{
            type : String,
        },
        role:{
            type : String,
            required: true,
            default: 'USER_ROLE'
        },
        google: {
            type : Boolean,
            required: false,
        },

});

//se ussa funcion normal y no funcion tipo flecha.
//para que el this haga efecto al objeto de refrencia
//Si es tipo flecha no hara referencia al mismo objeto..
//lo haria hacia afuera..del objeto..por eso funcion normal.
UsuarioSchema.method('toJSON', function() {
    //excluye ede la respuesta _id, __v, y password.
    const {_id, __v, password, ...object} = this.toObject();
    object.uid = _id;   //Para renombrar la salida de _id.
    return object;
})

module.exports = model ('Usuario', UsuarioSchema);


