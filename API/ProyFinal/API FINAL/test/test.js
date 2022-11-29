let   chai     = require('chai');
let   chaiHttp = require('chai-http');
const expect   = require('chai').expect;
chai.use(chaiHttp);const url= 'http://localhost:8081';
//Encapsular en test dentro de la funcion describe() Y describirmos el test

describe('Inserta un jugador: ',()=>{     
    it('deberia insertar un jugador', (done) => {       
        let params={
            Nombre:"Raul",
            Posicion:"Medio ofensivo",
            Sueldo:5500
        }
        chai.request(url)   
        .post('/AgregarJugador')
        .send(params)
        .end((err, res) => {
            expect(res).to.have.status(200);  
            done()
        });
    });
});

describe('Obtiene todos los jugadores: ',()=>{   
    it('Deberia obtener todos los jugadores', (done) => {
        chai.request(url)     
        .get('/MostrarJugadores')
        .send()
        .end( function(err,res){
            //console.log(res.body)
            expect(res).to.have.status(200);   
            expect(res).to.be.json;              
            done();
        });
    });
});

describe('obtener el jugador con el id 1: ',()=>{
    it('se obtiene el jugador con el id 1', (done) => {
    chai.request(url)
    .get('/MostrarJugador/1')
    .end( function(err,res){
    console.log(res.body)
    expect(res.body)
    expect(res.body).to.have.property('ID_Jugador').to.be.equal(1);
    expect(res).to.have.status(200);
    done();
    });
    });
   });

   describe('Elimina el id 2: ',()=>{
    it('Elimina el id  2', (done) => {
    chai.request(url)
    .get('/MostrarJugadores')
    .end( function(err,res){
    console.log(res.body)
    expect(res.body).to.have.lengthOf(2);
    expect(res).to.have.status(200);
    chai.request(url)
    .del('/borrarJugador/2')
    .end( function(err,res){
    console.log(res.body)
    expect(res).to.have.status(200);
    chai.request(url)
    .get('/MostrarJugadores')
    .end( function(err,res){
    console.log(res.body)
    expect(res.body).to.have.lengthOf(21);
    expect(res.body[1]).to.have.property('ID_Jugador').to.be.equal(2);
    expect(res).to.have.status(200);
    done();
    });
    });
    });
    });
   });
   
   