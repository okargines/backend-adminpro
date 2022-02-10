//crear modelos

const { Schema, model } = require ('mongoose');

const HospitalSchema = Schema({

        nombre: {
            type : String,
            required: true
        },
        img:{
            type : String,
        },
        usuario: {
            type: Schema.Types.ObjectId,
            ref: 'Usuario'
        }

}, {collection: 'hospitales'});

//se ussa funcion normal y no funcion tipo flecha.
//para que el this haga efecto al objeto de refrencia
//Si es tipo flecha no hara referencia al mismo objeto..
//lo haria hacia afuera..del objeto..por eso funcion normal.
HospitalSchema.method('toJSON', function() {
    //excluye ede la respuesta _id, __v, y password.
    const { __v, ...object} = this.toObject();
    return object;
})

module.exports = model ('Hospital', HospitalSchema);


