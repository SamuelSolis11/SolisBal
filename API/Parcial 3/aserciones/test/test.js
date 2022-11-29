let funciones= require('../src/funciones.js');
let chai=require('chai');
let shoul=chai.should();
let expect=chai.expect;
let assert=chai.assert;

describe('Pruebas de la funcion de potencia',function(){
    it('Deberia de regresar un numero y debe ser 8',function(){

        let resultado=funciones.potencia(2,3);
        resultado.should.be.a('number')
        resultado.should.equal(8)
    })
})

describe('Pruebas de la funcion de potencia',function(){
    it('Deberia de regresar un numero y debe ser 8',function(){

        let resultado=funciones.potencia(2,3);
        expect(resultado).to.be.a('number')
        expect(resultado).equal(8)
    })
})

describe('Pruebas de la funcion de potencia',function(){
    it('Deberia de regresar un numero y debe ser 8',function(){

        let resultado=funciones.potencia(2,3);
        assert.typeOf(resultado,'number')
        assert.equal(resultado,8)
    })
})


