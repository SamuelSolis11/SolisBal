const express = require('express')
const app = express()
const {query}= require('express')
const cors = require('cors')
const ruta_jugador = require('./crud')


app.use(express.json())
app.use(express.text())
app.use(cors({ origin:"http://localhost"}))

app.use('/Jugador',ruta_jugador.router);
app.use('/MostrarJugador/',ruta_jugador.router);
app.use('/AgregarJugador',ruta_jugador.router);
app.use('/actualizarJugador/',ruta_jugador.router);
app.use('/borrarJugador/',ruta_jugador.router);


app.listen(8081, ()=>{console.log('Servidor corriendo express')})