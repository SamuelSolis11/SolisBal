const express = require('express')
const app = express()

app.get('/', (req,res) => {
    res.end('Servidor Express contestando ')
}) 

app.listen(8082, ()=>{console.log('Servidor corriendo express')})