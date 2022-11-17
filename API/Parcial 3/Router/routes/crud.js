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



/**
  * @swagger
   * /MostrarJugadores:
   *   get:
   *     description: Muestra la lista de los jugadores.
   *     responses:
   *       200:
   *         description: Retorna los objetos .
   */
router.get('/',(req,res)=>{
    let sql='SELECT * FROM jugador';
    let query=connection.query(sql,(err,result)=>{
      if(err) throw err;
      res.send(result)
    })
  });

  /**
  * @swagger
   * /MostrarJugador:
   *   get:
   *     description: Muestra el jugador dependiendo el ID que ingreses.
   *     parameters:
   *       - ID_Jugador: ID_Jugador
   *         in: query
   *         description: 'Buscar por ID el jugador que deseas buscar'
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Retorna el objetos .
   */
  router.get('/:ID_Jugador',(req,res)=>{
    let sql=`SELECT * FROM jugador WHERE ID_Jugador=${req.params.ID_Jugador}`;
    let query=connection.query(sql,(err,result)=>{
      if(err) throw err;
      res.send(result)
    })
  })
  
  /**
  * @swagger
   * /AgregarJugadores:
   *   post:
   *     description: Agregar jugadores a la lista.
   *     responses:
   *       200:
   *         description: Ingresa datos al servidor .
   */
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
  
  /**
  * @swagger
   * /actualizarJugador:
   *   put:
   *     description: Actualiza el jugador dependiendo el ID que ingreses.
   *     parameters:
   *       - ID_Jugador: ID_Jugador
   *         in: query
   *         description: 'Actualiza los datos del jugador que quieras por medio del ID'
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Retorna el objetos .
   */
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
  
  /**
  * @swagger
   * /borrarJugador:
   *   delete:
   *     description: Elimina el jugador dependiendo el ID que ingreses.
   *     parameters:
   *       - ID_Jugador: ID_Jugador
   *         in: query
   *         description: 'Elimina por ID el jugador que deseas eliminar'
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Elimina el objeto.
   */
  router.delete('/:ID_Jugador', (req, res) => {
    let sql = `DELETE FROM jugador WHERE ID_Jugador = ${req.params.ID_Jugador}`;
    let query = connection.query(sql,(err,result)=>{
        if(err) throw err;
        res.send('Eliminado correctamente el Jugador')
    });
  }); 

  module.exports.router=router;

