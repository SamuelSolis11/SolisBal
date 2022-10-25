new gridjs.Grid({
    columns: ['Nombre', 'Posicion', 'Sueldo'],
    server: {
      url: 'http://localhost:8081/MostrarJugadores',
      then: data => data.map(ejemplo => 
        [ejemplo.Nombre, ejemplo.Posicion, ejemplo.Sueldo]
      )
    } 
  }).render(document.getElementById("wrapper"));