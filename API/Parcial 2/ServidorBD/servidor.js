const express = require('express')
const app = express()
let mysql= require('mysql');

let connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'ejemplo'
  });
   
  connection.connect();

app.get('/empleado/:id', async (req,res) => {
    //res.end('Servidor Express contestando ')
    const Dataid=req.params.id;
    console.log(Dataid)
    const[responseBD]= await connection.query(`SELECT * FROM jugador WHERE ID_Jugador=${Dataid}`);
    res.json(responseBD)
}) 

connection.end();

app.listen(8082, ()=>{console.log('Servidor corriendo express')})