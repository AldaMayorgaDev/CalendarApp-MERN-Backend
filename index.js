// 1.- Importar express

const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./src/database/config');
require('dotenv').config();
const { PORT } = process.env;


//2.- crear servidor de express

const app = express();

// ** Base de datos
dbConnection();

//CORS
app.use(cors())

//Directorio Publico
app.use(express.static('public'))

//lectura y parseo del body
app.use(express.json());
//Rutas
app.use('/api/auth', require('./src/routes/auth.routes'));
app.use('/api/events', require('./src/routes/events.routes'));

app.get('*', (req, rest) => {
    res.sendFile(__dirname + '/public/index.html');
})
//3.- Escuchar peticones

app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto: ${PORT}`)
});
