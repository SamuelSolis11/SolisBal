const express = require('express')
const app = express()
const {query}= require('express')
const cors = require('cors')
const ruta_jugador = require('./routes/crud')
const path=require('path')


const swaggerUI     = require('swagger-ui-express');
const swaggerJsDoc  = require('swagger-jsdoc');

const swaggerOptions = {definition:{
    openapi: '3.0.0',
     info: {title: 'API Jugadores Futbol',
     version: '1.0.0',      
    },
    servers:[{url: "http://localhost:8081"}],  
    },
    apis: [`${path.join(__dirname,"./routes/crud.js")}`],
  };


app.use(express.json())
app.use(express.text())
app.use(cors({ origin:"http://localhost"}))

app.use('/MostrarJugadores',ruta_jugador.router);
app.use('/MostrarJugador/',ruta_jugador.router);
app.use('/AgregarJugador',ruta_jugador.router);
app.use('/actualizarJugador/',ruta_jugador.router);
app.use('/borrarJugador/',ruta_jugador.router);

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs",swaggerUI.serve,swaggerUI.setup(swaggerDocs));


app.listen(8081, ()=>{console.log('Servidor corriendo express')})