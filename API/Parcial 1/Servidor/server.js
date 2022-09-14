const express =require('express')
const cors = require('cors')

const app=express()
app.use(cors({origin:"https://localhost"}))

app.get('/', (req,res) => {
    res.send('Servidor Express contestando a get desde pto 8082 ')
}) 

app.post('/', (req,res) => {
    res.send('Servidor Express contestando a post desde pto 8082 ')
}) 

app.listen(8082,() => {
    console.log('Servidor express escuchando en pto 8082')
})





