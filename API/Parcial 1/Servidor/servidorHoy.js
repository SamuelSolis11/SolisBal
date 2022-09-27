const express =require('express')
var fs = require('fs')
var morgan = require('morgan')
var path = require('path')
const cors = require('cors')
const cadenas = require('./modulos')

const app=express()
app.use(cors({ origin:"http://localhost"}))
app.use(express.text())
app.use(express.json())

// create a write stream (in append mode)
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
 
// setup the logger
app.use(morgan('combined', { stream: accessLogStream }))

app.use((req,res,next)=>{ 
    console.log("Esta es una funcion middleware")
    next()
},(req,res,next)=>{ 
    console.log("Esta es una segunda funcion middleware")
    next()
})

app.get('/', (req,res) => {
    //res.send('Servidor Express contestando a get desde pto 8082 ')
    res.sendFile('./static/index.html',{root:__dirname})
}) 

app.post('/texto', (req,res) => {
   // res.send('Servidor Express contestando a post desde pto 8082 ')
   console.log(req.body)
   let may =cadenas.pasarMayusculas(req.body)
   let sinesp=cadenas.quitarEspacios(req.body)
   let longi = cadenas.obtenerLongitud(req.body)

   res.json({mayusculas: may,sinespacios: sinesp,longitud: longi})
}) 



app.get('/suma', (req,res) => {
    //res.send('Servidor Express contestando a get desde pto 8082 ')
    console.log(req.query)
    let suma =parseInt(req.query.x)+parseInt(req.query.y)
    res.send(`La suma es ${suma}`)
}) 

app.get('/mayusculas/:cadena', (req,res) => {
    //res.send('Servidor Express contestando a get desde pto 8082 ')
    console.log(req.params)
    res.send(req.params)
}) 

app.post('/json', (req,res) => {
    //res.send('Servidor Express contestando a get desde pto 8082 ')
    console.log(req.body.nombre)
    let cadena =" hola " + req.body.nombre + " " + req.body.apellido + " como estas"
    res.json({saludo:cadena})
}) 

app.use((req,res) => {
    res.status(404).sendFile('./static/404.html' ,{root:__dirname})
})






app.listen(8081,() => {
    console.log('Servidor express escuchando en pto 8081')
    console.log(__dirname)
    console.log(__filename)
})





