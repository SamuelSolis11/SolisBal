let json2xls= require('json2xls');
let mysql= require('mysql');
let fs=require('fs');
const { dirname } = require('path');
let connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'ejemplo'
});
 
connection.connect();
 
connection.query('SELECT * FROM jugador', function (error, results, fields) {
  if (error) throw error;
  //console.log(results);

  var xls= json2xls(results);

  fs.writeFileSync(`${__dirname}/excel/data.xlsx`,xls,'binary')
});
 
connection.end();