require('dotenv').config();

const express = require('express') ;
const cors = require('cors');

//Acceso a la BD MONGO
//root
//V19tlRzc2Lu4MLjf   => ps2020ps
const { dbConnection } = require('./database/config');

//creando servidor express
const app = express();

//configurando CORS "middleware"
app.use( cors() );


//conexion a la base de datos.
dbConnection();


//console.log(process.env);




//rutas
app.get( '/', (req, res) => {
    res.json({
        ok: true,
        msg: 'Hola mundo'
    })
});




app.listen( process.env.PORT, () => {
    console.log('Servidor coriendo en puerto ' + process.env.PORT );
}) ;
