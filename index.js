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


//Lectura y Parseo del body
app.use( express.json() );



//conexion a la base de datos.
dbConnection();


//console.log(process.env);

 


//rutas
app.use('/api/usuarios',require('./routes/usuarios.js'))
app.use('/api/auth',require('./routes/auth.js'))


app.listen( process.env.PORT, () => {
    console.log('Servidor coriendo en puerto ' + process.env.PORT );
}) ;
