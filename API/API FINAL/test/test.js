let   chai     = require('chai');
let   chaiHttp = require('chai-http');
const expect   = require('chai').expect;
chai.use(chaiHttp);const url= 'http://localhost:8081';
//Encapsular en test dentro de la funcion describe() Y describirmos el test

// Test que inserta jugador
//
describe('Inserta un jugador: ',()=>{     
    it('deberia insertar un jugador', (done) => {       
        chai.request(url) 
        .post('/AgregarJugador?Nombre=Gabriel Gonzales&Posicion=DFC &Sueldo=3500.0')
        .end((err, res) => {
            expect(res).to.have.status(200);  
            done()
        });
    });
});

//Test que obtiene todos los jugadores de la lista
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

//Test que trae un id en especifico
describe('obtener el jugador con el id 1: ',()=>{
    it('Se obtiene el jugador con el id 1', (done) => {
    chai.request(url)
    .get('/MostrarJugador/1')
    .end( function(err,res){
    //console.log(res.body)
    expect(res.body)
    //expect(res.body).to.have.property(':ID_Jugador').to.be.equal(1);
    expect(res).to.have.status(200);
    done();
    });
    });
   });

   //Test que elimina el ID que tu pongas 
   describe('Elimina el id 3: ',()=>{
    it('Debe eliminar el  id  3', (done) => {
    chai.request(url)
    .get('/MostrarJugadores')
    .end( function(err,res){
    //console.log(res.body)
    //expect(res.body).to.have.lengthOf(2);
    expect(res).to.have.status(200);
    chai.request(url)
    .del('/borrarJugador/3')
    .end( function(err,res){
    //console.log(res.body)
    expect(res).to.have.status(200);
    chai.request(url)
    .get('/MostrarJugadores')
    .end( function(err,res){
    //console.log(res.body)
    //expect(res.body).to.have.lengthOf(21);
    //expect(res.body[1]).to.have.property('ID_Jugador').to.be.equal(2);
    expect(res).to.have.status(200);
    done();
    });
    });
    });
    });
   });

//Test que actualiza el ID
describe('Actualiza el ID que pongas: ',()=>{
    it('Deberia de actualizar el id', (done) => {
    chai.request(url)
    .put('/actualizarJugador/6?Nombre=Jona Dos&Posicion=Medio derecho&Sueldo=1990.5')
    .end( function(err,res){
    //expect(res.body).to.have.property('days').to.be.equal(20);
    expect(res).to.have.status(200);
    done();
    });
    });
   });




   
   