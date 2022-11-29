let   chai     = require('chai');
let   chaiHttp = require('chai-http');
const expect   = require('chai').expect;
chai.use(chaiHttp);const url= 'http://localhost:8081';
//Encapsular en test dentro de la funcion describe() Y describirmos el test

describe('Inserta un jugador: ',()=>{     
    it('deberia insertar un jugador', (done) => {       
        chai.request(url)   
        .post('/AgregarJugador')
        .send({ Nombre:"Samuel", Posicion:"Porterp",sueldo:2500 })
        .end( function(err,res){
            expect(res).to.have.status(200);        
            expect(res.text).to.be.a('string');      
             done();
            }); 
    });
});

describe('Obtiene todos los jugadores: ',()=>{   
    it('Deberia obtener todos los jugadores', (done) => {
        chai.request(url)     
        .get('/MostrarJugadores')
        .send()
        .end( function(err,res){
            expect(res).to.have.status(200);   
            expect(res).to.be.json;              
            done();
        });
    });
});