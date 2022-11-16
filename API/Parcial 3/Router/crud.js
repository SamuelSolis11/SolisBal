let mysql= require('mysql');
const express = require('express')
var router = express.Router()

let connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'ejemplo'
});
 
connection.connect((err)=>{
if(err){
  throw err;

}
console.log('mysql conectado')
})



router.get('/',(req,res)=>{
    let sql='SELECT * FROM jugador';
    let query=connection.query(sql,(err,result)=>{
      if(err) throw err;
      res.send(result)
    })
  })
  
  router.get('/:ID_Jugador',(req,res)=>{
    let sql=`SELECT * FROM jugador WHERE ID_Jugador=${req.params.ID_Jugador}`;
    let query=connection.query(sql,(err,result)=>{
      if(err) throw err;
      res.send(result)
    })
  })
  
  
  router.post('/', (req, res) => {
    console.log(req.query);
  
    let params = {
        'ID_Jugador': req.query.ID_Jugador,
        'Nombre': req.query.Nombre,
        'Posicion': req.query.Posicion,
        'Sueldo': req.query.Sueldo
    }
  
    let sql = 'Insert into jugador SET ?';
    let query = connection.query(sql,params,(err,result)=>{
        if(err) throw err;
        res.send('Agregado correctamente el Jugador')
    });
  }); 
  
  
  router.put('/:ID_Jugador', (req, res) => {
    console.log(req.query);
  
    let querys = {
      
      'Nombre': req.query.Nombre,
      'Posicion': req.query.Posicion,
      'Sueldo': req.query.Sueldo
    }
  
    let sql = `UPDATE jugador SET ? WHERE ID_Jugador = ${req.params.ID_Jugador}`;
  
    let query = connection.query(sql,querys,(err,result)=>{
        if(err) throw err;
        res.send('Actualizado correctamente los datos del Jugador')
    });
  }); 
  
  
  router.delete('/:ID_Jugador', (req, res) => {
    let sql = `DELETE FROM jugador WHERE ID_Jugador = ${req.params.ID_Jugador}`;
    let query = connection.query(sql,(err,result)=>{
        if(err) throw err;
        res.send('Eliminado correctamente el Jugador')
    });
  }); 

  module.exports.router=router;

