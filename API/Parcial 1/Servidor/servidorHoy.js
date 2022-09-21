const express =require('express')
const cors = require('cors')

const app=express()
app.use(cors({ origin:"http://localhost"}))

app.get('/', (req,res) => {
    //res.send('Servidor Express contestando a get desde pto 8082 ')
    res.sendFile('./static/index.html',{root:__dirname})
}) 

app.post('/', (req,res) => {
   // res.send('Servidor Express contestando a post desde pto 8082 ')
   res.json({usuario: 'Samuel'})
}) 

app.use((req,res) => {
    res.status(404).sendFile('./static/404.html' ,{root:__dirname})
})

app.listen(8081,() => {
    console.log('Servidor express escuchando en pto 8081')
    console.log(__dirname)
    console.log(__filename)
})





