let http = require('http');
let servidor=http.createServer((req,res)=>{
    
    res.write('Servidor HTTP esta contestando ');
    res.end();
});


servidor.listen(8081,()=>(console.log('Servidor http prendido')));