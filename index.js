//npm run start:dev


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


//Lectura y Parseo del body middleware
app.use( express.json() );

//conexion a la base de datos.
dbConnection();

//Para probar el Login de google.
//directorio publico.
app.use(express.static('public'));


//console.log(process.env);

//rutas
app.use('/api/usuarios', require('./routes/usuarios.js'));
app.use('/api/hospitales', require('./routes/hospitales.js'));
app.use('/api/medicos', require('./routes/medicos.js'));
app.use('/api/auth', require('./routes/auth.js'));
app.use('/api/login', require('./routes/auth.js'));
app.use('/api/todo', require('./routes/busquedas.js'));
app.use('/api/upload', require('./routes/uploads.js'));


app.listen( process.env.PORT, () => {
    console.log('Servidor coriendo en puerto ' + process.env.PORT );
});
